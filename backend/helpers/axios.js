const axios = require('axios');

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
