const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});

const {Pool} = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
});

pool.on('error', (err, client) => {
    console.error('Error:', err);
});

module.exports = pool;
