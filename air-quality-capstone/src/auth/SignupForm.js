import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../common/Alert';

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to homepage 
 *
 * 
 * Routed as /signup
 */

function SignupForm({ signup }) {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: '',
		email: '',
		password: '',
		default_locale: '',
		alerts: '0'
	});
	const [ formErrors, setFormErrors ] = useState([]);

	console.debug('SignupForm', 'signup=', typeof signup, 'formData=', formData, 'formErrors=', formErrors);

	/** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to home.
   */

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await signup(formData);
		if (result.success) {
			history.push('/');
		} else {
			setFormErrors(result.errors);
		}
	}

	/** Update form data field */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((data) => ({ ...data, [name]: value }));
	}

	return (
		<div className="SignupForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
				<h2 className="mb-3">Sign Up</h2>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Username</label>
								<input
									name="username"
									className="form-control"
									value={formData.username}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									name="email"
									className="form-control"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Zip Code</label>
								<input
									type="tel"
									pattern="[0-9]*"
									name="default_locale"
									className="form-control"
									value={formData.default_locale}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Email Alert Level</label>
								<select name="alerts" className="form-control" onChange={handleChange}>
									<option value="0">None</option>
									<option value="1">Moderate</option>
									<option value="2">Unhealthy for Sensitive Groups (suggested)</option>
									<option value="3">Unhealty </option>
									<option value="4">Very Unhealthy</option>
									<option value="5">Hazardous</option>
								</select>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									name="password"
									className="form-control"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>

							{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

							<button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
