const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const {Client} = require('pg');
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
});

require(path.join(__dirname, "pg_utils", "main.js")).database_scripts.overwrite_database(client);
