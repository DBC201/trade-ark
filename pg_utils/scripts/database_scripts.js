const path = require("path");
const fs = require("fs");

const schema = fs.readFileSync(path.join(__dirname, "..", "schema", "schema.sql"), {encoding: "utf-8"});
const overwrite_schema = fs.readFileSync(path.join(__dirname, "..", "schema", "overwrite_schema.sql"), {encoding: "utf-8"});

function initialize_database(client) {
    client.connect();

    client.query(schema, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("database successfully created.");
        }
        client.end();
    });
}

function overwrite_database(client) {
    client.connect();

    client.query(overwrite_schema, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("database successfully created.");
        }
        client.end();
    });
}

module.exports = {
    schema: schema,
    overwrite_schema: overwrite_schema,
    initialize_database: initialize_database,
    overwrite_database: overwrite_database,
};
