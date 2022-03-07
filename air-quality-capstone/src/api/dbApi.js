import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class DatabaseApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${DatabaseApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	/** Get the current user. */

	static async getCurrentUser(id) {
		let res = await this.request(`users/${id}`);
		return res.user;
	}

	/** Get token for login from username, password. */
	static async login(data) {
		let res = await this.request(`auth/token`, data, 'post');
		return res.token;
	}

	/** Signup for site. */

	static async signup(data) {
		let res = await this.request(`auth/register`, data, 'post');
		return res.token;
	}

	/** Save user profile page. */

	static async saveProfile(id, data) {
		let res = await this.request(`users/${id}`, data, 'patch');
		return res.user;
	}

	/** Delete user  */
	static async deleteUser(id) {
		let res = await this.request(`users/${id}`, {}, 'delete');
		return res.user;
	}

	/** Get details on a location by id. (yet to be implemented) */

	static async getLocation(id) {
		let res = await this.request(`locations/${id}`);
		return res.location;
	}

	/** Add location data (yet to be implemented) */

	static async addLocation(data) {
		let res = await this.request('locations', data, 'post');
		return res.location;
	}

	/**make changes to location */
	static async editLocation(id, data) {
		let res = await this.request(`locations/${id}`, data, 'patch');
		return res.location;
	}

	/**Subscribe to location */
	static async subscribeToLocation(data) {
		let res = await this.request(`subs`, data, 'post');
		return res.sub;
	}

	/**Edit sub */
	static async editSub(user_id, location_id, data) {
		let res = await this.request(`subs/${user_id}/${location_id}`, data, 'patch');
		return res.sub;
	}

	/** Delete Sub*/
	static async deleteSub(user_id, location_id) {
		let res = await this.request(`subs/${user_id}/${location_id}`, {}, 'delete');
		return res.sub;
	}
}

export default DatabaseApi;
