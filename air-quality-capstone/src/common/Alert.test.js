import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

it('renders without crashing', function() {
	render(<Alert />);
});

it('matches danger snapshot', function() {
	let messages = [ 'this is danger test', 'Hello is anyone there' ];
	const { asFragment } = render(<Alert type="danger" messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches success snapshot', function() {
	let messages = [ "You've had great success" ];
	const { asFragment } = render(<Alert type="success" messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});
