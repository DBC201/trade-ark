const express = require("express");
const path = require("path");

const router = express.Router();

const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));

router.get("/", function (req, res) {
    res.render("index", {loggedin: req.session.loggedin, username: req.session.username});
});

const account = require(path.join(__dirname, "account.js"));
router.get("/account*", account);
router.post("/account*", account);

module.exports = router;
