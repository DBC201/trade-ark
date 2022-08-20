class AccountUtils {
    constructor(databaseWrapper) {
        this.databaseWrapper = databaseWrapper;
        this.primary_key = "account_id";
        this.table_name = "accounts";
    }

    addAccount(username, email, hashedpassword) {
        return this.databaseWrapper.run_query(`INSERT INTO ${this.table_name} (username, email, hashed_password) VALUES (?,?,?)`, [username, email, hashedpassword]).lastInsertRowid;
    }

    getIdAndHashedPassword(username) {
        return this.databaseWrapper.get(`SELECT account_id, hashed_password FROM ${this.table_name} WHERE username=?`, [username]);
    }

    getUsernameAndEmailMatches(username, email) {
        return this.databaseWrapper.get_all(`SELECT username, email FROM ${this.table_name} WHERE username=? OR email=?`, [username, email]);
    }

    deleteAccount(account_id) {

    }
}

module.exports = AccountUtils;
