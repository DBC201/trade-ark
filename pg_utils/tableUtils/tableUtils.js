const path = require("path");

const AccountUtils = require(path.join(__dirname, "accountUtils.js"));

class UtilsInitializer {
    constructor(client) {
        this.accountUtilsObject = new AccountUtils(client);
    }
}

module.exports = {
  UtilsInitializer: UtilsInitializer,
  AccountUtils: AccountUtils,
};
