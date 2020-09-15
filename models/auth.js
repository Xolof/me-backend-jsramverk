var express = require("express");
const jwt = require("jsonwebtoken");


function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
       if (err) {
           return res.status(500).json({
               errors: {
                   status: 500,
                   title: "Validation failed.",
                   detail: err.message
               }
           });
       }

       next();
    });
}

module.exports = checkToken;
