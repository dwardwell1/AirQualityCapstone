import React, { useState, useContext } from 'react';
import Alert from '../common/Alert';
import dbApi from '../api/dbApi';
import UserContext from '../auth/UserContext';

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *

 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		email: currentUser.email,
		username: currentUser.username,
		password: '',
		defaultLocale: currentUser.defaultLocale,
		alerts: currentUser.alerts
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ isChanging, setIsChanging ] = useState(false);

	// switch to use our fancy limited-time-display message hook
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);
	// const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

	console.debug(
		'ProfileForm',
		'currentUser=',
		currentUser,
		'formData=',
		formData,
		'formErrors=',
		formErrors,
		'saveConfirmed=',
		saveConfirmed
	);

	/** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

	async function handleSubmit(evt) {
		evt.preventDefault();

		let profileData = {
			email: formData.email,

			default_locale: formData.defaultLocale.toString(),
			alerts: formData.alerts.toString()
		};

		let userId = currentUser.id;
		let updatedUser;
		//Quick check to see if any changes have been made to form, otherwise don't make DB requests
		if (
			(profileData.email === currentUser.email &&
				profileData.default_locale === currentUser.defaultLocale &&
				profileData.alerts === currentUser.alerts) ||
			isChanging == false
		) {
			alert('No Changes Made');
			return;
		}

		try {
			updatedUser = await dbApi.saveProfile(userId, profileData);
		} catch (errors) {
			// debugger;
			setFormErrors(errors);
			return;
		}

		setFormData((f) => ({ ...f, password: '' }));
		setFormErrors([]);
		setSaveConfirmed(true);

		// trigger reloading of user information throughout the site
		setCurrentUser(updatedUser);
		setIsChanging(false);
		//Set timeout to get green confirmation off screen after some seconds
		setTimeout(() => setSaveConfirmed(false), 3000);
	}

	/** Handle form data changing */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((f) => ({
			...f,
			[name]: value
		}));
		setFormErrors([]);
		setIsChanging(true);
	}

	function handleDelete(evt) {
		evt.preventDefault();
		let userId = currentUser.id;
		dbApi.deleteUser(userId);
		setCurrentUser(null);
	}
	return (
		<div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
			<h3>Profile</h3>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group">
							<label>Username</label>
							<p className="form-control-plaintext">{formData.username}</p>
						</div>

						<div className="form-group">
							<label>Email</label>
							<input
								name="email"
								className="form-control"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Subscribed ZipCode</label>
							<input
								name="defaultLocale"
								className="form-control"
								value={formData.defaultLocale}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Email Alert Level</label>
							<select
								name="alerts"
								className="form-control"
								onChange={handleChange}
								value={formData.alerts}
							>
								<option value="0">None</option>
								<option value="1">Moderate</option>
								<option value="2">Unhealthy for Sensitive Groups (suggested)</option>
								<option value="3">Unhealty </option>
								<option value="4">Very Unhealthy</option>
								<option value="5">Hazardous</option>
							</select>
						</div>

						{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

						{saveConfirmed ? <Alert type="success" messages={[ 'Updated successfully.' ]} /> : null}

						<button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
							Save Changes
						</button>

						<button className="btn btn-danger btn-block mt-4 mx-2" onClick={handleDelete}>
							Delete User
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ProfileForm;
