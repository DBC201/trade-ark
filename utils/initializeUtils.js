const path = require("path");
const pool = require(path.join(__dirname, "pool.js"));

const UtilsInitializer = require(path.join(__dirname, "..", "pg_utils", "main.js")).Utils.UtilsInitializer;

const utilsInitializer = new UtilsInitializer(pool);
// assuming utilsInitializer only uses queries

module.exports = utilsInitializer;
