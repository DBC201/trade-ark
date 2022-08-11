const express = require("express");
const path = require("path");

const router = express.Router();
const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));
const bcrypt = require("bcrypt");

router.get("/dm", function (req, res){
   res.render("dm");
});


module.exports = router;
