const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const overwrite_database = require(path.join(__dirname, "sqlite_utils", "main.js")).database_scripts.overwrite_database;

overwrite_database(process.env.abs_db_path);
