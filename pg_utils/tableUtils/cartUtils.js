
class CartUtils{
    constructor(client) {
        this.table_name = "cart";
        this.client = client;
    }

    addToCart(account_id, item_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`INSERT INTO ${table_name} (account_id, item_id) VALUES($1, $2)`, [account_id, item_id], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    removeFromCart(account_id, item_id) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`DELETE FROM ${table_name} WHERE account_id=$1 AND item_id=$2`, [account_id, item_id], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    getCart(account_id) {
        let client = this.client;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT S.item_id, item_name, item_thumbnail, item_price, item_sold FROM items_for_sale S
                            LEFT OUTER JOIN cart C ON C.account_id=S.account_id AND C.item_id=S.item_id
                                                      WHERE C.account_id=$1`, [account_id], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.rows);
                }
            });
        });
    }
}

module.exports = CartUtils;