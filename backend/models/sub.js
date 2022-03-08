'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for subscriptions. */

class Subs {
	/** Create a subscription to ZIP code location, MAX 3 (to be implemented) */

	static async create({ user_id, location_id, email_alerts = 0 }) {
		// First check if the user already has subscribed to this location
		const duplicateCheck = await db.query(
			`SELECT user_id, location_id
           FROM subs
           WHERE user_id = $1 AND location_id = $2`,
			[ user_id, location_id ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate Subscription`);

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

	/** Find all subs with email alerts on 
   * */

	static async findAll() {
		let result = await db.query(`SELECT user_id, 
                location_id, 
                email_alerts
               FROM subs WHERE email_alerts > 0`);

		const emailers = result.rows[0];

		return emailers;
	}

	/** Given a USER ID, return subs.
   *
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

		//logic to check for multiple default locations here

		return defLoc;
	}

	/** Update subs data with `data`.
   * No SqlforPartialUpdate here as email alerts are the only change possible. If you want to change location ID we need to delete and create a new one.
   */

	static async update(userId, locationId, emailAlerts) {
		const querySql = `UPDATE subs 
                      SET  email_alerts = $1
                      WHERE user_id = $2 AND location_id = $3
                      RETURNING user_id, location_id, email_alerts`;

		const result = await db.query(querySql, [ emailAlerts, userId, locationId ]);
		const updatedSub = result.rows[0];

		if (!updatedSub) throw new NotFoundError(`Sub doesnt exist`);

		return updatedSub;
	}

	/** Delete subscription for user relation
   *
   * Throws NotFoundError if sub not found.
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
