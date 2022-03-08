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
		async function getAqi() {
			const data = request(`zipCode=${user.zipcode}&distance=25&API_KEY=${API_KEY}`);
			return data;
		}
		let currAqi = await getAqi();

		if (currAqi[1].Category.Number - 1 <= user.alerts && currAqi[1].Category.Number != 1) {
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
					console.log('Email sent: ' + info.response);
				}
			});
		}
	}
};

module.exports = email;
