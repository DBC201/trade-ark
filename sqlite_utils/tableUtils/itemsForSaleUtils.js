class ItemsForSaleUtils {
    constructor(databaseWrapper) {
        this.databaseWrapper = databaseWrapper;
        this.table_name = "items_for_sale";
        this.primary_key = "item_id";
    }

    addItem(account_id, item_name, item_thumbnail, item_pictures, item_description, item_price) {
        return this.databaseWrapper.run_query(`INSERT INTO ${this.table_name} (account_id, item_name, item_thumbnail, item_pictures, item_description, item_price)
        VALUES (?,?,?,?,?,?)`, [account_id, item_name, item_thumbnail, item_pictures, item_description, item_price]).lastInsertRowid;
    }

    getItem(item_id) {
        return this.databaseWrapper.get(`SELECT *
        FROM ${this.table_name}
        WHERE item_id = ?`, [item_id]);
    }

    removeItem(account_id, item_id) {
        this.databaseWrapper.run_query(`DELETE
        FROM ${this.table_name}
        WHERE account_id=? AND item_id = ?`, [account_id, item_id]);
    }

    getListedItems(account_id) {
        return this.databaseWrapper.get_all(`SELECT I.item_id, item_name, item_thumbnail, item_price, item_sold, shipping_address
        FROM ${this.table_name} I LEFT OUTER JOIN purchase P on I.item_id=P.item_id WHERE I.account_id = ?`, [account_id]);
    }

    getItemRange(id_start, id_end) {
        return this.databaseWrapper.get_all(`SELECT item_id, item_name, item_thumbnail, item_price
        FROM ${this.table_name}
        WHERE ? <= item_id
          AND item_id <= ? AND item_sold=FALSE`, [id_start, id_end]);
    }

    editItem(account_id, item_id, item_name, item_thumbnail, item_pictures, item_description, item_price) {

    }
}

module.exports = ItemsForSaleUtils;
