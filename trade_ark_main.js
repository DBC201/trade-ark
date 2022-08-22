const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const fs = require("fs");
const argv = require("yargs")(process.argv.slice(2))
    .option("https", {
        description: "run https",
        alias: "n",
        type: "boolean",
        default: false,
    })
    .option("redis", {
        description: "run redis",
        alias: "r",
        type: "boolean",
        default: false
    })
    .help().alias("help", "h")
    .parse();
const body_parser = require("body-parser");

const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({
    //limit: "50mb",
    extended: true,
}));
app.use(body_parser.json({
    limit: "50mb",
}));

app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));

let session_parameter;
if (argv.redis) {
    const redis = require('redis');
    const redisClient = redis.createClient();
    const RedisStore = require('connect-redis')(session);
    session_parameter = {
        secret: process.env.session_secret,
        saveUninitialized: false,
        resave: false,
        store: new RedisStore({
            client: redisClient
        })
    }
} else {
    const SqliteStore = require("better-sqlite3-session-store")(session);
    const Sqlite = require("better-sqlite3");
    session_parameter = {
        store: new SqliteStore({
            client: new Sqlite(process.env.abs_db_path),
        }),
        secret: process.env.session_secret,
        saveUninitialized: false,
        resave: false
    };
}

app.use(session(session_parameter));

const http_port = process.env.http_port;
const https_port = process.env.https_port;

const http = require("http");
let http_server;

function create_http_server(app, port) {
    console.log("Running on port " + port);
    return http.createServer(app).listen(port);
}

if (argv.https) {
    const http_app = express(); //part below listens to http_port and redirects all traffic to https
    http_server = create_http_server(http_app, http_port);
    http_app.get("*", function (req, res) {
        res.redirect("https://" + req.headers.host + req.url);
    });

    const https = require('https');
    const credentials = {
        key: fs.readFileSync(process.env.private_key_dir, 'utf8'),
        cert: fs.readFileSync(process.env.certificate_dir, 'utf8')
    };
    const https_server = https.createServer(credentials, app).listen(https_port, function () {
        console.log("Running on port " + https_port);
    });
} else {
    http_server = create_http_server(app, http_port);
}

const routes = require(path.join(__dirname, "routes", "index"));
app.get("*", routes);
app.post("*", routes);

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500);
    res.render("generic", {message: "unexpected error", loggedin: req.session.loggedin});
});
