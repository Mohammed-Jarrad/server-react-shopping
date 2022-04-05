const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");

// Check Auth Request
// module.exports.authRequest = (req = express.request, res = express.response, next) => {
//     let token = req.cookies.jwt;
//     if (token) {
//         try {
//             const JWT = jwt.verify(token, "mohammed jarrad secret");
//             if (JWT) {
//                 res.locals.userID = JWT.user._id;
//                 console.log(res.locals.userID)
//             } else {
//                 res.locals.userID = null;
//                 return next();
//             }
//         } catch (e) {
//             res.locals.userID = null;
//             return res.status(401).json(e.message);
//         }
//     }
//     res.status(400).json(`The Token is Not Found`);
// };
module.exports.authRequest = (req = express.request, res = express.response, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const JWT = jwt.verify(token, "mohammed jarrad secret");
            res.locals.userID = JWT.user._id;
            console.log("JWT", JWT)
            return next();
        } catch (e) {
            console.log("Error", e.message)
            return res.status(401).json(e.message);
        }
    }
    res.status(401).json(`The Token is Not Found`);
};
