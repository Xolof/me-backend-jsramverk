var express = require("express");
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkToken = require("../models/auth.js");

router.get("/", (req, res, next) => {
    db.get("SELECT presentation FROM presentations WHERE id = 1",
        function(err, row) {
            if (err) {
                // returnera error
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            if (!row) {
                return res.status(404).json({
                    data: {
                        status: 404,
                        title: "Not found"
                    }
                });
            }

            return res.status(200).json({
                data: {
                    status: 200,
                    text: row.presentation
                }
            });
        });
});

router.get("/reports/week/:id", (req, res, next) => {
    let reportId = req.params.id;

    // Check if  the report is in the database.
    // If report exists, send it back in data.
    db.get("SELECT * FROM reports WHERE week = ?",
        [req.params.id],
        function(err, row) {
            if (err) {
                // returnera error
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            if (!row) {
                return res.status(404).json({
                    data: {
                        status: 404,
                        title: "Not found"
                    }
                });
            }

            return res.status(200).json({
                data: {
                    status: 200,
                    report: row
                }
            });
        });
});

router.post("/register", (req, res, next) => {

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    req.body.email,
    hash,
    (err) => {
        if (err) {
            // returnera error
            return res.status(500).json({
                errors: {
                    status: 500,
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        // 201 Created
        res.status(201).json({
            data: {
                status: 201,
                msg: "User created."
            }
        });
    });
});

router.post("/login", (req, res) => {

    db.get("SELECT * FROM users WHERE email = ?",
        [req.body.email],
        function(err, row) {
            if (err) {
                // returnera error
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            if (!row) {
                return res.status(404).json({
                    errors: {
                        status: 404,
                        title: "User does not exist."
                    }
                });
            }

            // comparing passsword with hash
            if (!bcrypt.compareSync(req.body.password, row.password)) {
                return res.status(404).json({
                    errors: {
                        status: 404,
                        details: "Login failed. Check email and password."
                    }
                });
            };

            const payload = { email: req.body.email };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });

            const data = {
                data: {
                    status: 200,
                    msg: "Login successful.",
                    token: token
                }
            };

            return res.json(data);
        });
});

router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => {
        console.log(req.body);
        db.run("INSERT INTO reports (week, report) VALUES (?, ?)",
        req.body.week,
        req.body.text,
        (err) => {
            if (err) {
                // returnera error
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            // 201 Created
            res.status(201).json({
                data: {
                    status: 201,
                    msg: "Report added."
                }
            });
        });
    }
);

router.put("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => {
        console.log(req.body);
        db.run(`UPDATE reports
            SET report = ?
            WHERE
                week = ?`,
        req.body.text,
        req.body.week,
        (err) => {
            if (err) {
                // returnera error
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            // 204 No Content
            res.status(204).send();
        });
    }
);

module.exports = router;

// router.put("/user", (req, res, next) => {
//     // 204 No Content
//     res.status(204).send();
// });
//
// router.delete("/user", (req, res, next) => {
//     // 204 No Content
//     res.status(204).send();
// });
