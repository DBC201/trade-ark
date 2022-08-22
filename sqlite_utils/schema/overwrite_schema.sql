BEGIN TRANSACTION;

DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS cart;
CREATE TABLE cart
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY ("account_id") REFERENCES accounts("account_id"),
    FOREIGN KEY ("item_id") REFERENCES items_for_sale("item_id"),
    PRIMARY KEY ("account_id", "item_id")
);

DROP TABLE IF EXISTS purchase;
CREATE TABLE purchase
(
    purchase_id INTEGER NOT NULL UNIQUE,
    item_id INTEGER NOT NULL UNIQUE,
    buyer_id INTEGER NOT NULL,
    shipping_address TEXT NOT NULL,
    billing_address TEXT NOT NULL,
    PRIMARY KEY ("purchase_id" AUTOINCREMENT),
    FOREIGN KEY ("item_id") REFERENCES items_for_sale("item_id"),
    FOREIGN KEY ("buyer_id") REFERENCES accounts("account_id")
);

DROP TABLE IF EXISTS items_for_sale;
CREATE TABLE items_for_sale
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL UNIQUE,
    item_name TEXT NOT NULL,
    item_thumbnail BLOB NOT NULL,
    item_pictures BLOB NOT NULL,
    item_description TEXT,
    item_price INTEGER NOT NULL,
    item_sold BOOLEAN NOT NULL DEFAULT FALSE,
    buyer_id INTEGER,
    PRIMARY KEY ("item_id" AUTOINCREMENT),
    FOREIGN KEY ("account_id") REFERENCES accounts ("account_id"),
    FOREIGN KEY ("buyer_id") REFERENCES accounts ("account_id")
);

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts
(
    account_id INTEGER NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    PRIMARY KEY ("account_id" AUTOINCREMENT)
);

DROP TRIGGER IF EXISTS account_delete;

DROP TRIGGER IF EXISTS item_delete;

DROP TRIGGER IF EXISTS item_buy;
CREATE TRIGGER item_buy
    AFTER INSERT ON purchase
BEGIN
    DELETE FROM cart WHERE cart.account_id=new.buyer_id AND cart.item_id=new.item_id;
    UPDATE items_for_sale SET item_sold=TRUE WHERE items_for_sale.item_id=new.item_id;
END;

COMMIT;
