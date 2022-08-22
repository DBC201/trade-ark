const path = require("path");

const AccountUtils = require(path.join(__dirname, "accountUtils.js"));
const ItemsForSaleUtils = require(path.join(__dirname, "itemsForSaleUtils.js"));
const CartUtils = require(path.join(__dirname, "cartUtils.js"));
const PurchaseUtils = require(path.join(__dirname, "purchaseUtils.js"));

class UtilsInitializer {
    constructor(databaseWrapper) {
        this.accountUtilsObject = new AccountUtils(databaseWrapper);
        this.itemsForSaleUtilsObject = new ItemsForSaleUtils(databaseWrapper);
        this.cartUtilsObject = new CartUtils(databaseWrapper);
        this.purchaseUtilsObject = new PurchaseUtils(databaseWrapper);
    }

    accountUtils() {
        return this.accountUtilsObject;
    }

    itemsForSaleUtils() {
        return this.itemsForSaleUtilsObject;
    }

    cartUtils() {
        return this.cartUtilsObject;
    }

    purchaseUtils() {
        return this.purchaseUtilsObject;
    }
}

module.exports = {
    UtilsInitializer: UtilsInitializer,
    AccountUtils: AccountUtils,
    ItemsForSaleUtils: ItemsForSaleUtils,
    CartUtils: CartUtils,
    PurchaseUtils: PurchaseUtils
};
