import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import SubsList from '../AqiCards/SubsList';
import LoginForm from '../auth/LoginForm';
import ProfileForm from '../profiles/ProfileForm';
import SignupForm from '../auth/SignupForm';
import PrivateRoute from './PrivateRoute';
import FireTracker from '../fireTracker/FireTracker';
import Freq from './Faqs';

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, getAqi }) {
	console.debug('Routes', `login=${typeof login}`, `register=${typeof register}`);

	return (
		<div className="">
			<Switch>
				<Route exact path="/">
					<Homepage getAqi={getAqi} />
				</Route>

				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>

				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>

				<Route exact path="/FAQ">
					<Freq />
				</Route>

				<PrivateRoute exact path="/subs">
					<SubsList />
				</PrivateRoute>

				<Route exact path="/fires">
					<FireTracker />
				</Route>

				<PrivateRoute path="/profile">
					<ProfileForm />
				</PrivateRoute>

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
