'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app');
const User = require('../models/user');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testUserIds,
	testLocIds,
	u1Token,
	u2Token,
	adminToken
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** POST /users */

describe('POST /users', function() {
	test('works for admins: create non-admin', async function() {
		const resp = await request(app)
			.post('/users')
			.send({
				username: 'u-new',
				password: 'password-new',
				email: 'new@email.com',
				is_admin: false
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			user: {
				username: 'u-new',
				email: 'new@email.com',
				isAdmin: false,
				defaultLocale: 95926,
				alerts: 1
			},
			token: expect.any(String)
		});
	});
});
//Need assistance with this test
