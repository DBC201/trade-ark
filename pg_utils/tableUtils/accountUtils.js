class AccountUtils{
    constructor(client) {
        this.client = client;
        this.primary_key = "account_id";
        this.table_name = "accounts";
    }

    addAccount(username, email, hashedpassword) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
           client.query(`INSERT INTO ${table_name} (username, email, hashed_password) VALUES ($1,$2,$3)`,[username, email, hashedpassword], function (err, res) {
              if (err) {
                  reject(err);
              }
              else {
                  resolve(res);
              }
           });
        });
    }

    getIdAndHashedPassword(username) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT account_id, hashed_password FROM ${table_name} WHERE username=$1`,[username], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    if (res.rows === undefined || res.rows.length === 0) {
                        resolve(undefined);
                    }
                    else {
                        resolve(res.rows[0]);
                    }
                }
            });
        });
    }

    getUsernameAndEmailMatches(username, email) {
        let client = this.client;
        let table_name = this.table_name;
        return new Promise(function (resolve, reject) {
            client.query(`SELECT username, email FROM ${table_name} WHERE username=$1 OR email=$2`, [username, email], function (err, res){
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.rows);
                }
            });
        });
    }

    deleteAccount(account_id) {

    }
}

module.exports = AccountUtils;
