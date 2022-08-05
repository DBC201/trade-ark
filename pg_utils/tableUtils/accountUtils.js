class AccountUtils{
    constructor(client) {
        this.client = client;
        this.primary_key = "account_id";
        this.table_name = "accounts";
    }

    addAccount(username, email, hashedpassword) {
        return new Promise(function (resolve, reject) {
           this.client.query(`INSERT INTO ${this.table_name} (username, email, hashed_password) VALUES (?,?,?)`,[username, email, hashedpassword], function (err, res) {
              if (err) {
                  reject(err);
              }
              else {
                  resolve(res);
              }
           });
        });
    }

    getHashedPassword(account_id) {
        return new Promise(function (resolve, reject) {
            this.client.query(`SELECT hashed_password FROM ${this.table_name} WHERE account_id=?`,[account_id], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}

module.exports = AccountUtils;
