var express = require("express");
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];

    const secret = process.env.JWT_SECRET;

    if (!verify(token, secret)) {
        return res.status(500).json({
            errors: {
                status: 500,
                title: "Validation failed.",
                // detail: err.message
            }
        });
    };

    next();
}

function verify(token, secret) {
    return jwt.verify(token, secret, function(err, decoded) {
       if (err) {
           return false;
       }
       return true;
    });
}

module.exports = {
    checkToken,
    verify
}
