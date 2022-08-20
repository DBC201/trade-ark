const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const DatabaseWrapper = require(path.join(__dirname, "..", "sqlite_utils", "main.js")).Database;

const databaseWrapper = new DatabaseWrapper(process.env.abs_db_path);

const UtilsInitializer = require(path.join(__dirname, "..", "sqlite_utils", "main.js")).Utils.UtilsInitializer;

const utilsInitializer = new UtilsInitializer(databaseWrapper);

module.exports = utilsInitializer;
