BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS accounts
(
    account_id INTEGER NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    PRIMARY KEY ("account_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS items_for_sale
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL UNIQUE,
    item_name TEXT NOT NULL,
    item_thumbnail bytea NOT NULL,
    item_pictures bytea NOT NULL,
    item_description TEXT,
    item_price INTEGER NOT NULL,
    item_sold BOOLEAN NOT NULL DEFAULT FALSE,
    buyer_id INTEGER,
    PRIMARY KEY ("item_id" AUTOINCREMENT),
    FOREIGN KEY ("account_id") REFERENCES accounts ("account_id"),
    FOREIGN KEY ("buyer_id") REFERENCES accounts ("account_id")
);

CREATE TABLE IF NOT EXISTS cart
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY ("account_id") REFERENCES accounts("account_id"),
    FOREIGN KEY ("item_id") REFERENCES items_for_sale("item_id"),
    PRIMARY KEY ("account_id", "item_id")
);

COMMIT;
