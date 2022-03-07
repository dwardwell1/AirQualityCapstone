import axios from 'axios';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * Make call to EoNet API to get the current fire alert status'. Currently set to 30 day history.
 */

const baseURL = 'https://eonet.gsfc.nasa.gov/api/v3/events?days=30&category=wildfires';

class fireApi {
	static async getEvents() {
		let res = await axios.get(baseURL);
		return res.data;
	}
}

export default fireApi;
