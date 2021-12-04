'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for companies. */

class Subs {
	/** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

	static async create({ user_id, location_id, email_alerts = 0 }) {
		const duplicateCheck = await db.query(
			`SELECT user_id, location_id
           FROM subs
           WHERE user_id = $1 AND location_id = $2`,
			[ user_id, location_id ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate Subscription`);
		console.log('hello', user_id, location_id, email_alerts);
		const result = await db.query(
			`INSERT INTO subs
           (user_id, location_id, email_alerts)
           VALUES ($1, $2, $3)
           RETURNING user_id, location_id,  email_alerts`,
			[ user_id, location_id, email_alerts ]
		);
		const subscription = result.rows[0];

		return subscription;
	}

	/** Find all companies (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

	static async findAll() {
		let result = await db.query(`SELECT user_id, 
                location_id, 
                email_alerts
               FROM companies WHERE email_alerts > 0`);

		const emailers = result.rows[0];

		return emailers;
	}

	// let query = `SELECT handle,
	//                     name,
	//                     description,
	//                     num_employees AS "numEmployees",
	//                     logo_url AS "logoUrl"
	//              FROM companies`;
	// let whereExpressions = [];
	// let queryValues = [];

	// const { minEmployees, maxEmployees, name } = searchFilters;

	// if (minEmployees > maxEmployees) {
	//   throw new BadRequestError("Min employees cannot be greater than max");
	// }

	// // For each possible search term, add to whereExpressions and queryValues so
	// // we can generate the right SQL

	// if (minEmployees !== undefined) {
	//   queryValues.push(minEmployees);
	//   whereExpressions.push(`num_employees >= $${queryValues.length}`);
	// }

	// if (maxEmployees !== undefined) {
	//   queryValues.push(maxEmployees);
	//   whereExpressions.push(`num_employees <= $${queryValues.length}`);
	// }

	// if (name) {
	//   queryValues.push(`%${name}%`);
	//   whereExpressions.push(`name ILIKE $${queryValues.length}`);
	// }

	// if (whereExpressions.length > 0) {
	//   query += " WHERE " + whereExpressions.join(" AND ");
	// }

	// // Finalize query and return results

	// query += " ORDER BY name";
	// const companiesRes = await db.query(query, queryValues);
	// return companiesRes.rows;

	/** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

	static async getSubs(userId) {
		const defaultRes = await db.query(
			`SELECT user_id,
                  location_id,
                  email_alerts
           FROM subs
           WHERE user_id = $1`,
			[ userId ]
		);

		const defLoc = defaultRes.rows[0];

		if (!defLoc) throw new NotFoundError(`No Default Set`);

		//logic to check for multiople default locations here

		return defLoc;
	}

	/** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

	static async update(userId, locationId, emailAlerts) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			userId: 'user_id',
			locationId: 'location_id'
		});
		const handleVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE subs 
                      SET  email_alerts = $1
                      WHERE user_id = $2 AND location_id = $3
                      RETURNING user_id, location_id, email_alerts`;

		const result = await db.query(querySql, [ emailAlerts, userId, locationId ]);
		const updatedSub = result.rows[0];

		if (!updatedSub) throw new NotFoundError(`Sub doesnt exist`);

		return updatedSub;
	}

	/** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

	static async remove(userid, locationId) {
		const result = await db.query(
			`DELETE
           FROM subs
            WHERE user_id = $1 AND location_id = $2`,
			[ userid, locationId ]
		);
		const sub = result.rows[0];

		if (!sub) throw new NotFoundError(`No Sub`);
	}
}

module.exports = Subs;
