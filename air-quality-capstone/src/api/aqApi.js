import axios from 'axios';

const BASE_URL_HISTORY = 'https://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&';

const BASE_URL = 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
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

		const url = `${BASE_URL}/${endpoint}`;
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// static async getAirQuality(zipCode, distance = 25) {
	// 	let res = await axios.get(BASE_URL + `zipCode=${zipCode}&distance=${distance}&API_KEY=${API_KEY}`);

	// 	return res;
	// }

	static async getAirQuality(zipCode, distance = 25) {
		let res = await this.request(`zipCode=${zipCode}&distance=${distance}&API_KEY=${API_KEY}`);

		return res;
	}
	// }
	// }

	//add history API soon
}

export default AqApi;
