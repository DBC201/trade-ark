const path = require("path");

const AccountUtils = require(path.join(__dirname, "accountUtils.js"));
const ItemsForSaleUtils = require(path.join(__dirname, "itemsForSaleUtils.js"));

class UtilsInitializer {
    constructor(client) {
        this.accountUtilsObject = new AccountUtils(client);
        this.itemsForSaleUtilsObject = new ItemsForSaleUtils(client);
    }

    accountUtils() {
        return this.accountUtilsObject;
    }

    itemsForSaleUtils() {
        return this.itemsForSaleUtilsObject;
    }
}

module.exports = {
    UtilsInitializer: UtilsInitializer,
    AccountUtils: AccountUtils,
    ItemsForSaleUtils: ItemsForSaleUtils,
};
