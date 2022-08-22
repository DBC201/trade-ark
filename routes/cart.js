const express = require("express");
const path = require("path");

const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));

const router = express.Router();

router.get("/cart", function (req, res, next) {
    if (!req.session.loggedin) {
        req.session.redirect = req.originalUrl;
        res.status(403);
        res.redirect("/account/login");
    } else {
        let rows = utilsInitializer.cartUtils().getCart(req.session.account_id);
        res.render("cart", { items: rows, loggedin: req.session.loggedin });
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

        utilsInitializer.cartUtils().addToCart(account_id, item_id);
        res.status(200);
        res.send("OK");
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

        utilsInitializer.cartUtils().removeFromCart(account_id, item_id);
        res.status(200);
        return res.send("OK");
    }
});

router.post("/cart/purchase", function (req, res, next) {
    if (!req.session.loggedin) {
        res.status(403);
        res.send("not logged in");
    } else {
        let shipping_address = req.body.shipping_address;
        let billing_address = req.body.billing_address;
        let items = req.body.items;
        let account_id = req.session.account_id;

        for (let i = 0; i < items.length; i++) {
            utilsInitializer.purchaseUtils().addPurchase(items[i], account_id, shipping_address, billing_address);
        }
        res.status(200);
        return res.send("OK");
    }
});

module.exports = router;
