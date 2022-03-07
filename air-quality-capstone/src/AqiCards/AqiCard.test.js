import React from 'react';
import { render } from '@testing-library/react';
import AqiCard from './AqiCard';
import { MemoryRouter } from 'react-router';
//How to test final result and not loading spinner?

it('matches snapshot with zip', async function() {
	const { asFragment } = await render(
		<MemoryRouter>
			<AqiCard zip="95926" />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('Show loading spinner if loading', async function() {
	const { asFragment } = await render(
		<MemoryRouter>
			<AqiCard zip="xxxxx" />
		</MemoryRouter>
	);

	expect(asFragment()).toMatchSnapshot();
});
