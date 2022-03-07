'use strict';

const { NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db.js');
const Location = require('./location.js');
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testLocationIds
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe('create', function() {
	let newLocation = {
		zipcode: 95927
	};

	test('works', async function() {
		let loc = await Location.create(newLocation);
		expect(loc).toEqual({
			id: expect.any(Number),
			zipcode: 95927
		});
	});
});

/************************************** get */

describe('get', function() {
	test('works', async function() {
		let loc = await Location.get(testLocationIds[0]);
		expect(loc).toEqual({
			city: 'Palo Alto',
			id: testLocationIds[0],
			lat: null,
			lng: null,
			stateCode: null,
			zipcode: 69696
		});
	});

	test('not found if no such locations', async function() {
		try {
			await Location.get(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** update */

describe('update', function() {
	let updateData = {
		zipcode: 55555,
		city: 'Boston',
		state_code: 'MA',
		lat: null,
		lng: null
	};
	test('works', async function() {
		let loc = await Location.update(testLocationIds[0], updateData);
		expect(loc).toEqual({
			id: testLocationIds[0],

			zipcode: 55555
		});
	});

	test('not found if no such location', async function() {
		try {
			await Location.update(0, {
				zipcode: 66666
			});
			fail();
		} catch (err) {
			console.log(err);
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test('bad request with no data', async function() {
		try {
			await Location.update(testLocationIds[0], {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

// /************************************** remove */

//
describe('remove', function() {
	test('works', async function() {
		await Location.remove(testLocationIds[0]);
		const res = await db.query('SELECT id FROM locations WHERE id=$1', [ testLocationIds[0] ]);
		expect(res.rows.length).toEqual(0);
	});

	test('not found if no such location', async function() {
		try {
			await Location.remove(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
