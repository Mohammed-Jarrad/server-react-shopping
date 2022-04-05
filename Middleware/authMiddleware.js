const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");

// Check Auth Request
module.exports.authRequest = (
  req = express.request,
  res = express.response,
  next
) => {
  let token = req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, "mohammed jarrad secret", async (err, decoded) => {
    //   if (err) return res.status(401).json(err);
    //   res.locals.userId = decoded.user._id;
      return next();
    });
  }
  res.status(400).json(`The Token is Not Found`);
};
