import axios from 'axios';

const BASE_URL_HISTORY = 'https://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&';

const BASE_URL = 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&';

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;
console.log(process.env.REACT_APP_WEATHER_API_KEY);

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * Future functionality may include:
 * - showing location history
 * 
 *
 */

class AqApi {
	/**
     * Get the current air quality for a zip code.
     *
     * @param {string} zipCode - The zip code to get the air quality for.
     * @returns {Promise} - A promise that resolves to the air quality data.
     */

	static async request(endpoint, data = {}, method = 'get') {
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

	static async getAqi(zipCode, distance = 25) {
		let res = await this.request(`zipCode=${zipCode}&distance=${distance}&API_KEY=${API_KEY}`);

		return res;
	}

	//add history API soon
}

export default AqApi;
