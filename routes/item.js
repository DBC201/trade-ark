const express = require("express");
const path = require("path");

const utilsInitializer = require(path.join(__dirname, "..", "utils", "initializeUtils.js"));

const router = express.Router();

router.get("/item/range", async function (req, res, next) {
    try {
        let id_start = req.query.id_start;
        let id_end = req.query.id_end;
        res.send(await utilsInitializer.itemsForSaleUtils().getItemRange(id_start, id_end));
    } catch (e) {
        res.send(e);
    }
});

router.get("/item", async function (req, res, next) {
    try{

        let item_id = req.query.item_id;
        if (!item_id) {
            res.status(400);
            return res.render("generic", {message: "Bad Request"});
        }
        let item = await utilsInitializer.itemsForSaleUtils().getItem(item_id);
        if (item === undefined) {
            res.status(404);
            return res.render("generic", {message: "item not found"});
        }

        res.render("item", item);
    } catch (e) {
        next(e);
    }
});

router.post("/item/edit", function (req, res, next) {
});

router.get("/item/add", function (req, res) {
    if (!req.session.loggedin) {
        req.session.redirect = req.originalUrl;
        res.redirect("/account/login");
    }
    else {
        res.render("item_form");
    }
});

router.post("/item/add", async function (req, res, next) {
    try {
        if (!req.session.loggedin) {
            res.status(403);
            res.send("login first to add an item");
        }
        else {
            let item_name = req.body.item_name;
            let item_thumbnail = req.body.item_thumbnail;
            let item_pictures = req.body.item_pictures;
            let item_description = req.body.item_description;
            let item_price = req.body.item_price;
            //console.log(req.body);

            if (!item_name || !item_thumbnail || !item_pictures || !item_description || !item_price) {
                res.status(400);
                return res.send("Bad Request");
            }

            item_pictures = JSON.stringify(item_pictures);
            item_thumbnail = JSON.stringify(item_thumbnail);

            let ret = await utilsInitializer.itemsForSaleUtils().addItem(req.session.account_id, item_name, item_thumbnail, item_pictures, item_description, item_price);
            //console.log(ret);
            res.status(200);
            res.send("/");
        }
    } catch (e) {
        next(e);
    }
});

router.post("/item/remove", function (req, res, next) {
    if (!req.session.loggedin) {
        res.status(403);
        res.send("login first to remove an item");
    }
    else {
        let item_id = req.body.item_id;

        if (!item_id) {
            res.status(400);
            return res.send("Bad Request");
        }

        utilsInitializer.itemsForSaleUtils().removeItem(req.session.account_id, item_id)
            .then(function () {
                res.status(200);
                res.send("OK");
            })
            .catch(function (err) {
                next(err);
            });
    }
});

module.exports = router;
