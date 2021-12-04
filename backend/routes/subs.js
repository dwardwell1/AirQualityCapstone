'use strict';

/** Routes for jobs. */

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const { ensureAdmin } = require('../middleware/auth');
const Sub = require('../models/sub');
const subNewSchema = require('../schemas/subNew.json');
const subUpdateSchema = require('../schemas/subUpdate.json');
// const jobSearchSchema = require("../schemas/jobSearch.json");

const router = express.Router({ mergeParams: true });

/** POST / { job } => { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */

router.post('/', async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, subNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		console.log(req.body);
		const sub = await Sub.create(req.body);
		return res.status(201).json({ sub });
	} catch (err) {
		return next(err);
	}
});

/** GET / =>
 *   { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
 *
 * Can provide search filter in query:
 * - minSalary
 * - hasEquity (true returns only jobs with equity > 0, other values ignored)
 * - title (will find case-insensitive, partial matches)

 * Authorization required: none
 */

// router.get("/", async function (req, res, next) {
//   const q = req.query;
//   // arrive as strings from querystring, but we want as int/bool
//   if (q.minSalary !== undefined) q.minSalary = +q.minSalary;
//   q.hasEquity = q.hasEquity === "true";

//   try {
//     const validator = jsonschema.validate(q, jobSearchSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const jobs = await Job.findAll(q);
//     return res.json({ jobs });
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /[jobId] => { job }
 *
 * Returns { id, title, salary, equity, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: none
 */

// M<ight not need this one
router.get('/:user_id', async function(req, res, next) {
	try {
		const sub = await Sub.getSubs(req.params.user_id);
		return res.json({ sub });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[jobId]  { fld1, fld2, ... } => { job }
 *
 * Data can include: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */

router.patch('/:user_id/:location_id', async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, jobUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const sub = await Sub.update(req.params.user_id, req.params.location_id, req.body);
		return res.json({ sub });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete('/:user_id/:location_id', async function(req, res, next) {
	try {
		await Sub.remove(req.params.user_id, req.params.location_id);
		return res.json({ deleted });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
