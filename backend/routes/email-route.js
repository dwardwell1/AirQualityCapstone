var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// load email form
router.get('/send-mail', function(req, res, next) {
	res.render('mail-form', { title: 'Send Mail with nodejs' });
});

// This route will work after submit the form
router.post('/send-email', function(req, res) {
	var receiver = req.body.to;
	var subject = req.body.subject;
	var message = req.body.message;

	let transporter = nodemailer.createTransport({
		host: 'smtppro.zoho.com',
		secure: true,
		port: 465,
		auth: {
			user: 'dwardwell1@gmail.com',
			pass: process.env.EMAIL_PASS
		}
	});

	var mailOptions = {
		from: 'dwardwell1@zohomail.com',
		to: receiver,
		subject: subject,
		text: message
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email was sent successfully: ' + info.response);
		}
	});
	res.render('mail-form', { title: 'Send Mail with nodejs' });
});
module.exports = router;
