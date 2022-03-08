'use strict';

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for locations. */

class Location {
	/** Create a location (from data), update db, return new location data.
   *
   * data should be {zipcode, city, stateCode, lat, lng} (only zipcode is required)
   *
   * Returns { id,zipcode } (for now)
   **/

	// static async create(data) {
	static async create({ zipcode = null, city = '', stateCode = '', lat = null, lng = null }) {
		const result = await db.query(
			`INSERT INTO locations (zipcode, city,state_code, lat, lng)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, zipcode`,
			[ zipcode, city, stateCode, lat, lng ]
		);

		let location = result.rows[0];

		return location;
	}

	/* Throws NotFoundError if not found.
   **/

	static async get(id) {
		const locRes = await db.query(
			`SELECT id,
                  zipcode,
                  city,
                   state_code AS "stateCode",
                  lat,
                  lng
           FROM locations
           WHERE id = $1`,
			[ id ]
		);

		const location = locRes.rows[0];

		if (!location) throw new NotFoundError(`No location: ${id}`);

		return location;
	}

	/** Update location data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { zipcode, city, stateCode, lat, lng }
   *
   * Returns {zipcode, city, stateCode, lat, lng  }
   *
   * Throws NotFoundError if not found.
   */

	static async update(id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {});
		const idVarIdx = '$' + (values.length + 1);
		if (!values.length) throw new BadRequestError('No data');
		const querySql = `UPDATE locations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                zipcode;`;
		const result = await db.query(querySql, [ ...values, id ]);
		const location = result.rows[0];

		if (!location) throw new NotFoundError(`No location: ${id}`);

		return location;
	}

	/** Delete given location from database; returns undefined.
   *
   * Throws NotFoundError if location not found.
   **/

	static async remove(id) {
		const result = await db.query(
			`DELETE
           FROM locations
           WHERE id = $1
           RETURNING id`,
			[ id ]
		);
		const location = result.rows[0];

		if (!location) throw new NotFoundError(`No location: ${id}`);
	}
}

module.exports = Location;
