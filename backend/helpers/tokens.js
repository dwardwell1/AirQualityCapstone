const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

//JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued. Data inlcudes the header, payload and signature.

/** return signed JWT from user data. */

function createToken(user) {
	console.assert(user.isAdmin !== undefined, 'createToken passed user without isAdmin property');

	let payload = {
		username: user.username,
		id: user.id,
		isAdmin: user.isAdmin || false
	};

	return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
