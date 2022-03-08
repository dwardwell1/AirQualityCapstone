'use strict';

/** Routes for jobs. */

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const Sub = require('../models/sub');
const subNewSchema = require('../schemas/subNew.json');
const subUpdateSchema = require('../schemas/subUpdate.json');

const router = express.Router({ mergeParams: true });

/** POST / { sub } => { sub }
 *
 * sub should be { sub_id, location_id, email_alerts }
 *
 * Returns { sub_id, location_id, email_alerts }
 *
 *
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

/** GET subs
 
 */

// Might not need this one
router.get('/:user_id', async function(req, res, next) {
	try {
		const sub = await Sub.getSubs(req.params.user_id);
		return res.json({ sub });
	} catch (err) {
		return next(err);
	}
});

/** PATCH 

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

/** DELETE /[sub]  =>  { deleted: id }
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
