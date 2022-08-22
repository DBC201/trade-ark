class PurchaseUtils{
    constructor(databaseWrapper) {
        this.table_name = "purchase";
        this.primary_key = "purchase_id";
        this.databaseWrapper = databaseWrapper;
    }

    addPurchase(item_id, buyer_id, shipping_address, billing_address) {
        return this.databaseWrapper.run_query(`INSERT INTO ${this.table_name} (item_id, buyer_id, shipping_address, billing_address) VALUES(?,?,?,?)`, [item_id, buyer_id, shipping_address, billing_address]).lastInsertRowid;
    }

    getPurchaseDetails(account_id, item_id) {

    }
}

module.exports = PurchaseUtils;
