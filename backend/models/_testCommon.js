const bcrypt = require('bcrypt');

const db = require('../db.js');
const { BCRYPT_WORK_FACTOR } = require('../config');

const testLocationIds = [];
const testUserIds = [];

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	// await db.query('DELETE FROM locations');
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM users');

	await db.query('DELETE FROM subs');

	await db.query('DELETE FROM locations');

	const resultsLocations = await db.query(`
	  INSERT INTO locations (zipcode, city)
	  VALUES (69696, 'Palo Alto'),
	         (90210, 'Beverly Hills'),
	         (11111, 'San Francisco'),
	         (22222, 'Los Angeles')
	  RETURNING id`);
	testLocationIds.splice(0, 0, ...resultsLocations.rows.map((r) => r.id));

	const userResults = await db.query(
		`
	INSERT INTO users(username, email, password, default_locale, alerts)
	VALUES ('test4', '4@gmail.com',$1, 95926, 1),
	('test5', '5@gmail.com', $2, 11111, 2)
	      RETURNING id`,
		[ await bcrypt.hash('password1', BCRYPT_WORK_FACTOR), await bcrypt.hash('password2', BCRYPT_WORK_FACTOR) ]
	);
	testUserIds.splice(0, 0, ...userResults.rows.map((r) => r.id));

	await db.query(
		`
	      INSERT INTO subs(user_id, location_id)
	      VALUES ($1, $2)`,
		[ testUserIds[0], testLocationIds[0] ]
	);
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

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testLocationIds,
	testUserIds
};
