const express = require("express");
const path = require("path");

const router = express.Router();

const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));

module.exports = router;
