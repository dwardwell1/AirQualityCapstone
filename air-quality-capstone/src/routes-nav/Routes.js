import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import SubsList from '../companies&Locations/CompanyList';
// import JobList from '../jobs/JobList';
// import CompanyDetail from "../companies&Locations/CompanyDetail";
import LoginForm from '../auth/LoginForm';
import ProfileForm from '../profiles/ProfileForm';
import SignupForm from '../auth/SignupForm';
import PrivateRoute from './PrivateRoute';

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
	console.debug('Routes', `login=${typeof login}`, `register=${typeof register}`);

	return (
		<div className="pt-5">
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>

				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>

				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>

				<PrivateRoute exact path="/subs">
					<SubsList />
				</PrivateRoute>

				{/* <PrivateRoute exact path="/fires">
					<JobList />
				</PrivateRoute> */}

				<PrivateRoute path="/profile">
					<ProfileForm />
				</PrivateRoute>

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
