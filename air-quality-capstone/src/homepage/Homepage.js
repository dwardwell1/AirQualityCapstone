import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Alert from '../common/Alert';
import AqiCard from '../AqiCards/AqiCard';
import './Homepage.css';
import UserContext from '../auth/UserContext';

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({ getAqi }) {
	const { currentUser } = useContext(UserContext);

	const history = useHistory();
	const [ formData, setFormData ] = useState({
		zipcode: ''
	});

	const [ formErrors, setFormErrors ] = useState([]);
	const [ location, setLocation ] = useState(null);

	console.debug('Homepage', 'currentUser=', currentUser, 'formData=', formData, 'formErrors', formErrors);

	async function handleSubmit(evt) {
		evt.preventDefault();
		setLocation(formData.zipcode);
	}

	/** Update form data field */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((data) => ({ ...data, [name]: value }));
	}

	return (
		<div className="Homepage pt-0 ">
			<div className="container text-center">
				<h1 className="mb-4 font-weight-bold">Current Air Quality Search</h1>
				<p className="lead">Check your local air quality.</p>
				<div className="LoginForm">
					<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
						<h3 className="mb-3">AQI based on ZIP code</h3>

						<div className="card ">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>ZIP code</label>
										<input
											name="zipcode"
											className="form-control"
											value={formData.zipcode}
											onChange={handleChange}
											autoComplete="zipcode"
											required
										/>
									</div>

									{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

									<button className="btn btn-primary float-right" onSubmit={handleSubmit}>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				{location ? <AqiCard zip={location} /> : null}

				{currentUser ? (
					<h5 className="mt-5">
						View <a href="/subs">Subscribed Location</a> AQ{' '}
					</h5>
				) : (
					<p>
						<Link className=" font-weight-bold" to="/signup">
							Sign up
						</Link>{' '}
						for Email alerts or
						<br />
						<Link className=" font-weight-bold" to="/login">
							Login here
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}

export default Homepage;
