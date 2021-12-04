'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for companies. */

class Location {
	/** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
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

	/** Find all jobs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */

	// static async findAll({ minSalary, hasEquity, title } = {}) {
	//   let query = `SELECT j.id,
	//                       j.title,
	//                       j.salary,
	//                       j.equity,
	//                       j.company_handle AS "companyHandle",
	//                       c.name AS "companyName"
	//                FROM jobs j
	//                  LEFT JOIN companies AS c ON c.handle = j.company_handle`;
	//   let whereExpressions = [];
	//   let queryValues = [];

	//   // For each possible search term, add to whereExpressions and
	//   // queryValues so we can generate the right SQL

	//   if (minSalary !== undefined) {
	//     queryValues.push(minSalary);
	//     whereExpressions.push(`salary >= $${queryValues.length}`);
	//   }

	//   if (hasEquity === true) {
	//     whereExpressions.push(`equity > 0`);
	//   }

	//   if (title !== undefined) {
	//     queryValues.push(`%${title}%`);
	//     whereExpressions.push(`title ILIKE $${queryValues.length}`);
	//   }

	//   if (whereExpressions.length > 0) {
	//     query += " WHERE " + whereExpressions.join(" AND ");
	//   }

	//   // Finalize query and return results

	//   query += " ORDER BY title";
	//   const jobsRes = await db.query(query, queryValues);
	//   return jobsRes.rows;
	// }

	/** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
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

		// const companiesRes = await db.query(
		// 	`SELECT handle,
		//               name,
		//               description,
		//               num_employees AS "numEmployees",
		//               logo_url AS "logoUrl"
		//        FROM companies
		//        WHERE handle = $1`,
		// 	[ job.companyHandle ]
		// );

		// delete job.companyHandle;
		// job.company = companiesRes.rows[0];

		return location;
	}

	/** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   */

	static async update(id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE locations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                zipcode, 
                                city, 
                                state_code AS "stateCode",
                                lat,
                                lng`;
		const result = await db.query(querySql, [ ...values, id ]);
		const location = result.rows[0];

		if (!location) throw new NotFoundError(`No location: ${id}`);

		return location;
	}

	/** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
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
