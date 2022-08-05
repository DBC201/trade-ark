const path = require("path");

module.exports = {
    Client: require(path.join(__dirname, "wrapper", "clientWrapper.js")),
    Utils: require(path.join(__dirname, "tableUtils", "tableUtils.js")),
    database_scripts: require(path.join(__dirname, "scripts", "database_scripts.js")),
};
