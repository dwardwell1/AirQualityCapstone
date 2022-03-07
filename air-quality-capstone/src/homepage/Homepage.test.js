import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Homepage';
import { UserProvider } from '../testUtils';

it('matches snapshot', function() {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<Home />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot when logged out', function() {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider currentUser={null}>
				<Home />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test('Shows login option if no user', () => {
	const { getByText } = render(
		<MemoryRouter>
			<UserProvider currentUser={null}>
				<Home />
			</UserProvider>
		</MemoryRouter>
	);
	const page = getByText(/Login Here/i);
	expect(page).toBeInTheDocument();
});
