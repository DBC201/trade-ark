const express = require("express");
const path = require("path");

const router = express.Router();
const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));
const bcrypt = require("bcrypt");

router.get("/account", function (req, res) {
   if (!req.session.loggedin) {
       req.session.redirect = req.session.originalUrl;
       res.redirect("/account/login");
   }
   else {
       res.render("account", {username: req.session.username});
   }
});

router.get("/account/login", function (req, res) {
    if (req.session.loggedin) {
        res.redirect("/");
    }
    else {
        res.render("login_form");
    }
});

router.post("/account/login", async function (req, res, next) {
    try {
        if (req.session.loggedin) {
            res.status(403);
            return res.send("already logged in");
        }
        else {
            let username = req.body.username;
            let password = req.body.password;

            if (!username || !password) {
                res.status(400);
                return res.send("Bad Request");
            }

            let rows = await utilsInitializer.accountUtils().getHashedPassword(username);
            if (rows === undefined || rows.length === 0) {
                res.status(403);
                return res.send("invalid credientials");
            }
            bcrypt.compare(password, rows[0].hashed_password, function(err, match) {
                if (err) {
                    next(err);
                }
                else if (match) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.account_id = rows[0].account_id;
                    if (req.body.rememberMe) {
                        req.session.cookie.maxAge = 86400000 * 30;
                    }
                    let redirect = req.session.redirect || '/';
                    delete req.session.redirect;
                    res.status(200);
                    res.send(redirect);
                }
                else {
                    res.status(403);
                    res.send("invalid credientials");
                }
            });
        }   
    } catch (e) {
        next(e);
    }
});

router.get("/account/register", function (req, res) {
    if (req.session.loggedin) {
        res.redirect("/");
    }
    else {
        res.render("register_form");
    }
});

router.post("/account/register", async function (req, res, next) {
    try {
        if (req.session.loggedin) {
            res.status(403);
            res.send("log out first to register");
        }
        else {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;

            if (!username || !email || !password) {
                res.status(400);
                return res.send("Bad Request");
            }

            let rows = await utilsInitializer.accountUtils().getUsernameAndEmail(username, email);
            console.log("basdf:", rows);

            if (rows === undefined || rows.length === 0) {
                let salt = await bcrypt.genSalt();
                let hashedpassword = await bcrypt.hash(password, salt);
                await utilsInitializer.accountUtils().addAccount(username, email, hashedpassword);
                res.status(200);
                return res.send("OK");
            } else if (rows.length > 1) {
                res.status(403);
                return res.send("email and username taken");
            } else if (rows[0].email === email && rows[0].username === username) {
                res.status(403);
                return res.send("email and username taken");
            } else if (rows[0].email === email) {
                res.status(403);
                return rows.send("email taken");
            } else if (rows[0].username === username) {
                res.status(403);
                return res.send("username taken");
            }
        }
    } catch (e) {
        next(e);
    }
});

router.get("/account/logout", function (req, res, next) {
    req.session.destroy(function (err){
        if (err) {
            next(err);
        }
        else {
            res.status(200);
            res.redirect("/");
        }
    });
});

router.get("/account/delete", function (req, res) {

});

module.exports = router;
