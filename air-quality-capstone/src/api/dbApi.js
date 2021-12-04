import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
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

	/** Get companies (filtered by name if not undefined) */

	// static async getCompanies(name) {
	//   let res = await this.request("companies", { name });
	//   return res.companies;
	// }

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

	/** Get details on a company by handle. */
	/** Get details on a location by id. */

	static async getLocation(id) {
		let res = await this.request(`locations/${id}`);
		return res.location;
	}
	// static async getCompany(handle) {
	//   let res = await this.request(`companies/${handle}`);
	//   return res.company;
	// }

	/** Get list of jobs (filtered by title if not undefined) */

	static async addLocation(data) {
		let res = await this.request('locations', data, 'post');
		return res.location;
	}
	// static async getJobs(title) {
	//   let res = await this.request("jobs", { title });
	//   return res.jobs;
	// }

	//make changes to location
	static async editLocation(id, data) {
		let res = await this.request(`locations/${id}`, data, 'patch');
		return res.location;
	}

	/** Apply to a job */
	//Subscribe to new location
	static async subscribeToLocation(data) {
		let res = await this.request(`subs`, data, 'post');
		return res.sub;
	}

	//edit sub
	static async editSub(user_id, location_id, data) {
		let res = await this.request(`subs/${user_id}/${location_id}`, data, 'patch');
		return res.sub;
	}

	//delete sub
	static async deleteSub(user_id, location_id) {
		let res = await this.request(`subs/${user_id}/${location_id}`, {}, 'delete');
		return res.sub;
	}

	// static async applyToJob(username, id) {
	//   await this.request(`users/${username}/jobs/${id}`, {}, "post");
	// }

	// /** Get token for login from username, password. */

	// static async login(data) {
	//   let res = await this.request(`auth/token`, data, "post");
	//   return res.token;
	// }

	// /** Signup for site. */

	// static async signup(data) {
	//   let res = await this.request(`auth/register`, data, "post");
	//   return res.token;
	// }

	// /** Save user profile page. */

	// static async saveProfile(username, data) {
	//   let res = await this.request(`users/${username}`, data, "patch");
	//   return res.user;
	// }
}

export default DatabaseApi;
