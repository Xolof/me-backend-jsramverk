const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Om man vill använda sig av parametrar tillsammans med
// HTTP metoderna POST, PUT och DELETE används body-parser.
const bodyParser = require("body-parser");

const app = express();
const port = 1337;

const router = require("./routes/router");

// Use the module "cors" to allow clients from other domains
// to consume the API.
app.use(cors());

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// Only show the log when not "test".
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined")); // "combined" outputs Apache logs.
}

// Middleware for all routes.
// Takes 3 params.
app.use((req, res, next) => {
    console.log("Method: " + req.method);
    console.log("Path: " + req.path);
    console.log(req.body);
    next();
});

app.use('/', router);

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
       "errors": [
           {
               "status": err.status,
               "title": err.message,
               "detail": err.message
           }
       ]
    });
});

app.listen(port, () => console.log(`Me-API listening on port ${port}`));
