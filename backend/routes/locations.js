'use strict'; //locations

/** Routes for companies. */ const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
const Location = require('../models/location');

const locationNewSchema = require('../schemas/locationNew.json');
const locationUpdateSchema = require('../schemas/locationUpdate.json');
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();

/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: admin
 */

router.post('/', async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, locationNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const location = await Location.create(req.body);
		return res.status(201).json({ location });
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', async function(req, res, next) {
	try {
		const location = await Location.get(req.params.id);
		return res.json({ location });
	} catch (err) {
		return next(err);
	}
});

/** PATCH 
 *
 * Patches location data.
 *

 *
 * Authorization required: admin
 */

router.patch('/:id', ensureAdmin, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, locationUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const location = await Location.update(req.params.id, req.body);
		return res.json({ location });
	} catch (err) {
		return next(err);
	}
});

/** DELETE location
 *
 * Authorization: admin
 */

router.delete('/:id', ensureAdmin, async function(req, res, next) {
	try {
		await Location.remove(req.params.id);
		return res.json({ deleted: req.params.id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
