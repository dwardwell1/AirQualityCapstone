'use strict';

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../expressError');
const db = require('../db.js');
const User = require('./user.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testUserIds } = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe('authenticate', function() {
	test('works', async function() {
		const user = await User.authenticate('test4', 'password1');
		expect(user).toEqual({
			username: 'test4',
			email: '4@gmail.com',
			isadmin: false,
			defaultlocale: 95926
		});
	});

	test('unauth if no such user', async function() {
		try {
			await User.authenticate('nope', 'password');
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});

	test('unauth if wrong password', async function() {
		try {
			await User.authenticate('test4', 'wrong');
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

/************************************** register */

describe('register', function() {
	const newUser = {
		username: 'new',
		email: 'new@gmail.com',
		defaultlocale: 11111,
		alerts: 2
	};

	test('works', async function() {
		let user = await User.register({
			...newUser,
			password: 'password'
		});
		expect(user).toEqual({ username: 'new', email: 'new@gmail.com', is_admin: null });
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		console.log(found.rows[0]);
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(null);
		expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
	});

	test('works: adds admin', async function() {
		let user = await User.register({
			...newUser,
			password: 'password',
			isAdmin: true
		});
		expect(user).toEqual({ username: 'new', email: 'new@gmail.com', is_admin: true });
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(true);
		expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
	});

	test('bad request with dup data', async function() {
		try {
			await User.register({
				...newUser,
				password: 'password'
			});
			await User.register({
				...newUser,
				password: 'password'
			});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

// /************************************** findAll */

describe('findAll', function() {
	test('works', async function() {
		const users = await User.findAll();
		expect(users).toEqual([
			{
				username: 'test4',
				defaultLocale: 95926,
				email: '4@gmail.com',
				isAdmin: false
			},
			{
				username: 'test5',
				defaultLocale: 11111,
				email: '5@gmail.com',
				isAdmin: false
			}
		]);
	});
});

// /************************************** get */

describe('get', function() {
	test('works', async function() {
		let user = await User.get(testUserIds[0]);
		expect(user).toEqual({
			id: testUserIds[0],
			username: 'test4',
			email: '4@gmail.com',
			isAdmin: false,
			defaultLocale: 95926,
			alerts: 1
		});
	});

	test('not found if no such user', async function() {
		try {
			await User.get(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

// /************************************** update */

describe('update', function() {
	const updateData = {
		username: 'NewF',
		email: 'new@email.com',
		isAdmin: true
	};

	test('works', async function() {
		let user = await User.update(testUserIds[0], updateData);
		expect(user).toEqual({
			username: 'NewF',
			email: 'new@email.com',
			is_admin: true,
			alerts: 1,
			default_locale: 95926,
			id: testUserIds[0]
		});
	});

	test('works: set password', async function() {
		let user = await User.update(testUserIds[0], {
			password: 'new'
		});
		expect(user).toEqual({
			username: 'test4',
			email: '4@gmail.com',
			is_admin: false,
			alerts: 1,
			default_locale: 95926,
			id: testUserIds[0]
		});
		const found = await db.query("SELECT * FROM users WHERE username = 'test4'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
	});

	test('not found if no such user', async function() {
		try {
			await User.update(0, {
				alerts: 2
			});
			fail();
		} catch (err) {
			console.log(err);
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test('bad request if no data', async function() {
		expect.assertions(1);
		try {
			await User.update(testUserIds[0], {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

// /************************************** remove */

describe('remove', function() {
	test('works', async function() {
		await User.remove(testUserIds[0]);
		const res = await db.query('SELECT * FROM users WHERE id=$1', [ testUserIds[0] ]);
		expect(res.rows.length).toEqual(0);
	});

	test('not found if no such user', async function() {
		try {
			await User.remove(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
