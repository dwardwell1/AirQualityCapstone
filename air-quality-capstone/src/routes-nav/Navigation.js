import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import './Navigation.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

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
