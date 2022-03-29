import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Navigation.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Offcanvas, Container } from 'react-bootstrap';

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
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav ml-auto  mx-2 justify-content-between font-weight-bold ">
					<li className="nav-item mr-4">
						<NavLink className="nav-link " to="/aqi">
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
			</div>
		);
	}

	function loggedOutNav() {
		return (
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav ml-auto mx-2 ">
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
			</div>
		);
	}

	// return (
	// 	<nav className="navbar navbar-expand-lg bg-light justify-content-between fixed-top">
	// 		<Link className=" h1 navbar-brand mx-5 " to="/">
	// 			Air(Q)
	// 		</Link>
	// 		<button
	// 			className="navbar-toggler"
	// 			type="button"
	// 			data-toggle="collapse"
	// 			data-target="#navbarNavDropdown"
	// 			aria-controls="navbarNavDropdown"
	// 			aria-expanded="false"
	// 			aria-label="Toggle navigation"
	// 		>
	// 			<span className="navbar-toggler-icon" />
	// 		</button>
	// 		{currentUser ? loggedInNav() : loggedOutNav()}
	// 	</nav>
	// );

	return (
		<Navbar collapseOnSelect expand="lg" bg="light">
			<Container>
				<Navbar.Brand href="/">Air(Q)</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/aqi">Air Quality</Nav.Link>
						<Nav.Link href="/fires">Fire Tracker</Nav.Link>
						<Nav.Link href="/FAQ">FAQs</Nav.Link>
					</Nav>

					{currentUser ? (
						<Nav>
							<NavDropdown title={currentUser.username} id="collasible-nav-dropdown">
								<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
								<NavDropdown.Item href="/" onClick={logout}>
									Log out {currentUser.username}
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					) : (
						<Nav>
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/signup">Sign Up</Nav.Link>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
