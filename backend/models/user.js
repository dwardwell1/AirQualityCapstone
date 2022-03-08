'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForPartialUpdate } = require('../helpers/sql');
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../expressError');

const { BCRYPT_WORK_FACTOR } = require('../config.js');

/** Related functions for users. */

class User {
	/** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

	static async authenticate(username, password) {
		// try to find the user first
		const result = await db.query(
			`SELECT username,
                  password,
                  email,
                  default_locale as defaultLocale,
                  is_admin as isAdmin
                  FROM users
           WHERE username = $1`,
			[ username ]
		);

		const user = result.rows[0];

		if (user) {
			// compare hashed password to a new hash from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError('Invalid username/password');
	}

	/** Register user with data.
   *
   * Returns { username, email }
   *
   * Throws BadRequestError on duplicates.
   **/

	static async register({ username, email, password, default_locale, alerts, isAdmin }) {
		const duplicateCheck = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[ username ]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate username: ${username}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
           (username,
            email,
            password, default_locale,alerts, is_admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, email, is_admin`,
			[ username, email, hashedPassword, default_locale, alerts, isAdmin ]
		);

		const user = result.rows[0];

		return user;
	}

	/** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

	static async findAll() {
		const result = await db.query(
			`SELECT username,
                  email,
                  default_locale as "defaultLocale",
                  is_admin as "isAdmin"
                  FROM users
           ORDER BY username`
		);

		return result.rows;
	}

	/** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

	static async get(id) {
		const userRes = await db.query(
			`SELECT id, username,
                  email,
                  default_locale as "defaultLocale", alerts,
                  is_admin as "isAdmin"
           FROM users
           WHERE id = $1`,
			[ id ]
		);

		const user = userRes.rows[0];

		if (!user) throw new NotFoundError(`No user`);

		// to be added back later when we have the locations table
		// const getUserLocations = await db.query(`SELECT location_id FROM subs WHERE user_id = $1`, [ id ]);

		// user.locations = getUserLocations.rows.map((a) => a.location_id);
		return user;
	}

	static async getByName(username) {
		const userRes = await db.query(
			`SELECT id, username,
                  email,
                  default_locale as "defaultLocale",
				  alerts,
                  is_admin as "isAdmin"
           FROM users
           WHERE username = $1`,
			[ username ]
		);

		const user = userRes.rows[0];

		if (!user) throw new NotFoundError(`No user`);
		let user_id = user.id;

		const getUserLocations = await db.query(`SELECT location_id FROM subs WHERE user_id = $1`, [ user_id ]);
		console.log('!!!!looking here now', getUserLocations.rows, 'user id is', user_id);
		user.locations = getUserLocations.rows.map((a) => a.location_id);
		return user;
	}

	/** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
\
   */

	static async update(id, data) {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
		}
		if (!data) throw new BadRequestError('No data');
		const { setCols, values } = sqlForPartialUpdate(data, {
			defaultLocale: 'default_locale',
			isAdmin: 'is_admin'
		});
		const usernameVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${usernameVarIdx} 
                      RETURNING username,
                                id, email, default_locale, alerts, is_admin`;

		const result = await db.query(querySql, [ ...values, id ]);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user with that id`);

		delete user.password;
		return user;
	}

	/** Delete given user from database; returns undefined. */

	static async remove(id) {
		let result = await db.query(
			`DELETE
           FROM users
           WHERE id = $1
           RETURNING username`,
			[ id ]
		);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user with that id`);
	}

	/** Sub to a location.
   *
   * - user_id: id of user to sub to location
   * - location_id: id of location to sub to
   **/

	static async subLocation(userId, locationId, defaultLocation = false, alertLevel = 3) {
		const preCheck = await db.query(
			`SELECT id
       FROM users
       WHERE id = $1`,
			[ userId ]
		);
		const user = preCheck.rows[0];

		if (!user) throw new NotFoundError(`No username: ${username}`);

		const preCheck2 = await db.query(
			`SELECT id
           FROM locations
           WHERE id = $1`,
			[ locationId ]
		);
		const location = preCheck2.rows[0];

		if (!location) throw new NotFoundError(`No location: ${locationId}`);

		await db.query(
			`INSERT INTO subs ( user_id, location_id, alert_level)
           VALUES ($1, $2, $3)`,
			[ userId, locationId, alertLevel ]
		);
	}

	/** get emails of those who sub'd for email updates */
	static async getEmails() {
		const result = await db.query(
			// `SELECT email, zipcode FROM users JOIN locations on (users.default_locale = locations.id);`
			`SELECT email, default_locale AS zipcode, alerts FROM users;`
		);

		return result.rows;
	}
}

module.exports = User;
