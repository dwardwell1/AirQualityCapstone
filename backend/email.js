const nodemailer = require('nodemailer');
const axios = require('axios');
const { request } = require('./helpers/axios');

let transporter = nodemailer.createTransport({
	host: 'smtppro.zoho.com',
	secure: true,
	port: 465,
	auth: {
		user: 'dwardwell1@gmail.com',
		pass: process.env.EMAIL_PASSWORD
	}
});

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const email = async function() {
	// Increment post tracker

	// Make GET Request on every 2 minutes
	//call database to make array of users and zip codes for those subscribed to email alerts
	async function getEmails() {
		let res = await axios.get(`http://localhost:3001/users/emails`);
		return res.data.users;
	}

	let userEmails = await getEmails();

	for (let user of userEmails) {
		console.log('first log', user);

		async function getAqi() {
			const data = request(`zipCode=${user.zipcode}&distance=25&API_KEY=${API_KEY}`);
			return data;
		}
		let currAqi = await getAqi();
		console.log('comparison', user.alerts, currAqi[1].Category.Number, currAqi[1].Category.Name);
		// console.log('second log', currAqi);

		if (currAqi[1].Category.Number - 1 <= user.alerts && currAqi[1].Category.Number != 1) {
			console.log('This is the current aqi: ', currAqi[1].Category.Number);
			console.log('comparison', user.alerts, currAqi[1].Category.Number);
			// let currAqi = await currAqi[1];

			console.log(`The current AQI in ${currAqi[1].ReportingArea}  is: `, currAqi[1].Category.Name);
			let mailOptions = {
				from: 'dwardwell1@zohomail.com',
				to: `${user.email}`,
				subject: 'Your AQI checkin',
				text: `The current AQI in ${currAqi[1].ReportingArea}  is:  ${currAqi[1].Category.Name}`
			};
			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error, currAqi);
				} else {
					// `SELECT email, zipcode FROM users JOIN locations on (users.default_locale = locations.id);`
					console.log('Email sent: ' + info.response);
				}
			});
		}
	}
};

// async function email() {
// 	let emails = [];

// 	let transporter = nodemailer.createTransport({
// 		host: 'smtppro.zoho.com',
// 		secure: true,
// 		port: 465,
// 		auth: {
// 			user: 'dwardwell1@gmail.com',
// 			pass: 'Morrison!1'
// 		}
// 	});

// 	let mailOptions = {
// 		from: 'dwardwell1@zohomail.com',
// 		to: 'lauraje.tv@gmail.com',
// 		subject: 'Email from Node-App: A Test Message!',
// 		text: 'Did you get the email'
// 	};

// 	transporter.sendMail(mailOptions, function(error, info) {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log('Email sent: ' + info.response);
// 		}
// 	});
// }

module.exports = email;
