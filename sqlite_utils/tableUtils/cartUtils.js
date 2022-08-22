class CartUtils {
    constructor(databaseWrapper) {
        this.table_name = "cart";
        this.databaseWrapper = databaseWrapper;
    }

    addToCart(account_id, item_id) {
        this.databaseWrapper.run_query(`INSERT INTO ${this.table_name} (account_id, item_id) VALUES(?, ?)`, [account_id, item_id]);
    }

    removeFromCart(account_id, item_id) {
        this.databaseWrapper.run_query(`DELETE FROM ${this.table_name} WHERE account_id=? AND item_id=?`, [account_id, item_id]);
    }

    getCart(account_id) {
        return this.databaseWrapper.get_all(`SELECT S.item_id, item_name, item_thumbnail, item_price, item_sold FROM items_for_sale S
        LEFT OUTER JOIN cart C ON C.item_id=S.item_id WHERE C.account_id=?`, [account_id]);
    }
}

module.exports = CartUtils;
