
class ItemsForSaleUtils {
    constructor(client) {
        this.client = client;
        this.table_name = "items_for_sale";
        this.primary_key = "item_id";
    }

    addItem(account_id, item_name, item_thumbnail, item_pictures, item_description, item_price) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`INSERT INTO ${table_name} (account_id, item_name, item_thumbnail, item_pictures, item_description, item_price)
                          VALUES ($1, $2, $3, $4, $5, $6)
                          RETURNING item_id`,
                [account_id, item_name, item_thumbnail, item_pictures, item_description, item_price], function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    getItem(item_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT *
                          FROM ${table_name}
                          WHERE item_id = $1`,
                [item_id], function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.rows === undefined || res.rows.length === 0) {
                            resolve(undefined);
                        } else {
                            resolve(res.rows[0]);
                        }
                    }
                });
        });
    }

    removeItem(account_id, item_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`DELETE
                          FROM ${table_name}
                          WHERE item_id = $1`,
                [item_id], function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    getUserItemIds(account_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT item_id
                          FROM ${table_name}
                          WHERE account_id = $1`,
                [account_id], function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.rows === undefined || res.rows.length === 0) {
                            resolve(undefined);
                        } else {
                            resolve(res.rows);
                        }
                    }
                });
        });
    }

    getItemRange(id_start, id_end) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT item_id, item_name, item_thumbnail, item_price
                          FROM ${table_name}
                          WHERE $1 <= item_id
                            AND item_id <= $2 AND item_sold=FALSE`, [id_start, id_end],
                function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res.rows);
                    }
                });
        });
    }

    markAsSold(item_id, buyer_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
           client.query(`UPDATE ${table_name} SET item_sold=TRUE, buyer_id=$2 WHERE item_id=$1 AND item_sold=FALSE`, [item_id, buyer_id], function (err, res) {
               if (err) {
                   reject(err);
               }
               else {
                   resolve(res);
               }
           });
        });
    }

    editItem(account_id, item_id, item_name, item_thumbnail, item_pictures, item_description, item_price) {

    }
}

module.exports = ItemsForSaleUtils;
