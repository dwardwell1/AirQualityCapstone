import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Navigation.css';

/** Navigation bar for site. S
 *
 * When user is logged in, shows links to main areas profile link and logout link.
 * If not logged, shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
	const { currentUser } = useContext(UserContext);
	console.debug('Navigation', 'currentUser=', currentUser);

	function loggedInNav() {
		return (
			<ul className="navbar-nav ml-auto  mx-2 justify-content-between font-weight-bold">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/aqi">
						Air Quality
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/FAQ">
						FAQs
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/fires">
						Fire Tracker
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/profile">
						Profile
					</NavLink>
				</li>
				<div className="nav-item mr-4">
					<li className="nav-item">
						<Link className="nav-link" to="/" onClick={logout}>
							Log out {currentUser.username}
						</Link>
					</li>
				</div>
			</ul>
		);
	}

	function loggedOutNav() {
		return (
			<ul className="navbar-nav ml-auto mx-2">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/fires">
						Fire Tracker
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/FAQ">
						FAQs
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" to="/login">
						Login
					</NavLink>
				</li>
				<li className="nav-item mr-8">
					<NavLink className="nav-link" to="/signup">
						Sign Up
					</NavLink>
				</li>
			</ul>
		);
	}

	return (
		<nav className="navbar navbar-expand-md bg-light justify-content-between">
			<Link className=" h1 navbar-brand mx-5 " to="/">
				Air(Q)
			</Link>
			{currentUser ? loggedInNav() : loggedOutNav()}
		</nav>
	);
}

export default Navigation;
