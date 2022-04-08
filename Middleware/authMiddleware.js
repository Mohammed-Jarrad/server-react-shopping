const jwt = require("jsonwebtoken");
const express = require("express");

module.exports.authRequest = (req = express.request, res = express.response, next) => {
    // ! bearer token
    // const bearerToken = req.header('Authorization');
    // if (bearerToken) {
    //     try {
    //         const token = bearerToken.split(' ')[1];
    //         const DECODE_JWT = jwt.verify(token, 'mohammed jarrad secret');
    //         res.locals.userID = DECODE_JWT.user._id;
    //         return next();
    //     } catch (error) {
    //         return res.status(401).json({ error });
    //     }
    // } else res.status(401).json({ errors: "Token Not Found" });

    // ! the simple token ('x-auth-token')
    let token = req.header('x-auth-token');
    console.log(req.headers)
    if (token) {
        try {
            const DECODE_JWT = jwt.verify(token, "mohammed jarrad secret");
            res.locals.userID = DECODE_JWT.user._id;
            return next();
        } catch (e) {
            return res.status(401).json({ errors: e });
        }
    } else res.status(401).json(`The Token is Not Found`);
};
