'use strict';

const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testLocIds,
	u1Token,
	adminToken
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /location */

describe('POST /location', function() {
	const newLocation = {
		zipcode: 12345
	};

	test('ok for user', async function() {
		const resp = await request(app).post('/locations').send(newLocation).set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			location: newLocation
		});
	});

	test('bad request with invalid data', async function() {
		const resp = await request(app)
			.post('/locations')
			.send({
				zipcode: 'haha'
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(400);
	});
});

/************************************** GET /locations*/

describe('GET /location', function() {
	test('works for user', async function() {
		console.log(testLocIds);
		const resp = await request(app).get(`/locations/${testLocIds[0].id}`).set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			location: {
				zipcode: 12345,
				city: '',
				id: testLocIds[0].id,
				lat: null,
				lng: null,
				stateCode: ''
			}
		});
	});

	test('not found for no location', async function() {
		const resp = await request(app).get(`/companies/nope`);
		expect(resp.statusCode).toEqual(404);
	});
});

// /************************************** PATCH /locations/:id */

describe('PATCH /locations/:id', function() {
	test('works for admin', async function() {
		const resp = await request(app)
			.patch(`/locations/${testLocIds[0].id}`)
			.send({
				zipcode: 54545
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.body).toEqual({
			location: {
				zipcode: 54545,
				id: testLocIds[0].id
			}
		});
	});

	test('unauth for non-admin', async function() {
		const resp = await request(app)
			.patch(`/locations/${testLocIds[0].id}`)
			.send({
				zipcode: '54545'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).patch(`/locations/${testLocIds[0].id}`).send({
			zipcode: '54545'
		});
		expect(resp.statusCode).toEqual(401);
	});

	test('not found on no such location', async function() {
		const resp = await request(app)
			.patch(`/locations/0`)
			.send({
				zipcode: 'nah'
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('bad request on zipcode change attempt', async function() {
		const resp = await request(app)
			.patch(`/locations/${testLocIds[0].id}`)
			.send({
				zipcode: 'text'
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(400);
	});
});

// /************************************** DELETE /locations/:id */

describe('DELETE /locations/:id', function() {
	test('works for admin', async function() {
		const resp = await request(app)
			.delete(`/locations/${testLocIds[0].id}`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.body).toEqual({ deleted: `${testLocIds[0].id}` });
	});

	test('unauth for non-admin', async function() {
		const resp = await request(app)
			.delete(`/locations/${testLocIds[0].id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).delete(`/locations/${testLocIds[0].id}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found for no such company', async function() {
		const resp = await request(app).delete(`/locations/0`).set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(404);
	});
});
