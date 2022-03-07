import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText('Sign Up');
	expect(linkElement).toBeInTheDocument();
});

it('renders without crashing', function() {
	render(<App />);
});
