const path = require("path");

const AccountUtils = require(path.join(__dirname, "accountUtils.js"));

class UtilsInitializer {
    constructor(client) {
        this.accountUtilsObject = new AccountUtils(client);
    }

    accountUtils() {
        return this.accountUtilsObject;
    }
}

module.exports = {
  UtilsInitializer: UtilsInitializer,
  AccountUtils: AccountUtils,
};
