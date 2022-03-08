'use strict';

const db = require('../db.js');
const User = require('../models/user');
const Location = require('../models/location');
const Sub = require('../models/sub');
const { createToken } = require('../helpers/tokens');

const testSubIds = [];
const testLocIds = [];
const testUserIds = [];

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM users');
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM locations');

	testLocIds[0] = await Location.create({
		zipcode: '12345'
	});
	testLocIds[1] = await Location.create({
		zipcode: '54321'
	});
	testLocIds[2] = await Location.create({
		zipcode: '11111'
	});

	testUserIds[0] = await User.register({
		username: 'u1',
		email: 'user1@user.com',
		password: 'password1',
		isAdmin: false
	});
	testUserIds[1] = await User.register({
		username: 'u2',
		email: 'user2@user.com',
		password: 'password2',
		isAdmin: false
	});
	testUserIds[2] = await User.register({
		username: 'u3',
		email: 'user3@user.com',
		password: 'password3',
		isAdmin: false
	});

	// testSubIds[0] = await Sub.create({ user_id: `${testUserIds[0]}`, location_id: `${testLocIds[0]}` });
	// testSubIds[1] = await Sub.create({ user_id: `${testUserIds[0]}`, location_id: `${testLocIds[0]}` });
	// testSubIds[2] = await Sub.create({ user_id: `${testUserIds[0]}`, location_id: `${testLocIds[0]}` });
}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}

const u1Token = createToken({ username: 'u1', isAdmin: false });
const u2Token = createToken({ username: 'u2', isAdmin: false });
const adminToken = createToken({ username: 'admin', isAdmin: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testSubIds,
	testLocIds,
	testUserIds,
	u1Token,
	u2Token,
	adminToken
};
