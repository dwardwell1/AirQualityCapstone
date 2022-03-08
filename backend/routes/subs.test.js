'use strict';

const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testUserIds,
	testLocIds,
	testSubIds,
	u1Token,
	adminToken
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** POST /subs */

describe('POST /subs', function() {
	test('ok for admin', async function() {
		const resp = await request(app)
			.post(`/subs`)
			.send({
				user_id: testUserIds[0],
				location_id: testLocIds[0],
				email_alerts: 1
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			sub: {
				user_id: testUserIds[0],
				location_id: testLocIds[0],
				email_alerts: 1
			}
		});
	});
});
