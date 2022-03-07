import React from 'react';
import UserContext from './auth/UserContext';

const demoUser = {
	username: 'testuser',
	email: 'test@test.net',
	default_locale: '95926',
	alerts: 5
};

const UserProvider = ({ children, currentUser = demoUser }) => (
	<UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
);

export { UserProvider };
