const jwt = require('jsonwebtoken');
const express = require('express');

module.exports.authRequest = (req = express.request, res = express.response, next) => {
	// ! the simple token ('x-auth-token')
	let token = req.header('x-auth-token');
	if (token) {
		try {
			const DECODE_JWT = jwt.verify(token, 'mohammed jarrad secret');
			res.locals.userID = DECODE_JWT.user._id;
			return next();
		} catch (e) {
			return res.status(401).json({ errors: 'the token not valid !' });
		}
	} else res.status(401).json(`The Token is Not Found`);

	// ! bearer token
	// const bearerToken = req.header('Authorization');
	// if (bearerToken) {
	// 	const token = bearerToken.split(' ')[1];
	// 	try {
	// 		const DECODE_JWT = jwt.verify(token, 'mohammed jarrad secret');
	// 		res.locals.userID = DECODE_JWT.user._id;
	// 		return next();
	// 	} catch (error) {
	// 		return res.status(401).json({ error });
	// 	}
	// } else res.status(401).json({ errors: 'Token Not Found' });
};
