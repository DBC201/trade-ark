const express = require("express");
const path = require("path");

const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));

const router = express.Router();

router.get("/cart", async function (req, res, next) {
    try {
        if (!req.session.loggedin) {
            req.session.redirect = req.originalUrl;
            res.status(403);
            res.redirect("/account/login");
        } else {
            let rows = await utilsInitializer.cartUtils().getCart(req.session.account_id);
            res.render("cart", {items: rows});
        }
    } catch (e) {
        next(e);
    }
});

router.post("/cart/add", function (req, res, next) {
    if (!req.session.loggedin) {
        res.status(403);
        res.send("not logged in");
    } else {
        let account_id = req.session.account_id;
        let item_id = req.body.item_id;

        if (!item_id) {
            res.status(404);
            return res.send("Bad Request");
        }

        utilsInitializer.cartUtils().addToCart(account_id, item_id).then(function () {
            res.status(200);
            res.send("OK");
        }).catch(function (err) {
            next(err);
        });
    }
});

router.post("/cart/remove", function (req, res, next) {
    if (!req.session.loggedin) {
        res.status(403);
        res.send("not logged in");
    } else {
        let account_id = req.session.account_id;
        let item_id = req.body.item_id;

        if (!item_id) {
            res.status(404);
            return res.send("Bad Request");
        }

        utilsInitializer.cartUtils().removeFromCart(account_id, item_id).then(function () {
            res.status(200);
            res.send("OK");
        }).catch(function (err) {
            next(err);
        });
    }
});

router.post("/cart/purchase", async function (req, res, next) {
    try {
        if (!req.session.loggedin) {
            res.status(403);
            res.send("not logged in");
        } else {
            let account_id = req.session.account_id;
            let items = req.body.items;

            for (let i=0; i<items.length; i++) {
                await utilsInitializer.itemsForSaleUtils().markAsSold(items[i], req.session.account_id);
            }
            res.status(200);
            return res.send("OK");
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
