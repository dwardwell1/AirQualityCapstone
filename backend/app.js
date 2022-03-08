'use strict';

/** Express app for Air(Q). */

const express = require('express');
const cors = require('cors');

const { NotFoundError } = require('./expressError');

const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const locationsRoutes = require('./routes/locations');
const usersRoutes = require('./routes/users');
const subsRoutes = require('./routes/subs');
const email = require('./email');

const morgan = require('morgan');

const app = express();
const emailRouter = require('./routes/email-route');
const schedule = require('node-schedule');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/locations', locationsRoutes);
app.use('/users', usersRoutes);
app.use('/subs', subsRoutes);
app.use('/email', emailRouter);

/** Handle 404 errors*/
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

/*at reccurent interval
send email to all users with email alerts on*/

schedule.scheduleJob('*/2 * * * *', function() {
	console.log('Emailing alerts', new Date());
	email();
});

module.exports = app;
