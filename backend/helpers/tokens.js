const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** return signed JWT from user data. */

function createToken(user) {
	console.log('CAN WE SEE THIS');
	console.assert(user.isAdmin !== undefined, 'createToken passed user without isAdmin property');
	console.log(user.id, 'hellooo?????');

	let payload = {
		username: user.username,
		id: user.id,
		isAdmin: user.isAdmin || false
	};

	return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
