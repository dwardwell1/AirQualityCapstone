const axios = require('axios');

//Axios: Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6. It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. It also has the ability to cancel requests.

const BASE_URL = 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&';

async function request(endpoint, data = {}, method = 'get') {
	console.debug('API Call:', endpoint, data, method);

	const url = `${BASE_URL}${endpoint}`;
	const params = method === 'get' ? data : {};

	try {
		return (await axios({ url, method, data, params })).data;
	} catch (err) {
		console.error('API Error:', err.response);
		let message = err.response.data.error.message;
		throw Array.isArray(message) ? message : [ message ];
	}
}

module.exports = { request };
