class _Row {
    constructor(table_name, client, primary_key) {
        this.table_name = table_name;
        this.client = client;
        this.primary_key = primary_key;
    }

    getRowByPrimaryKey () {
        return new Promise(function (resolve, reject) {
           this.client.query(`SELECT * FROM ${this.table_name} WHERE ${this.primary_key}=?`, function (err, res) {
               if (err) {
                   reject(err);
               }
               else {
                   resolve(res);
               }
           })
        });
    }
}