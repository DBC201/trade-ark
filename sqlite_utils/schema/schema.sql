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
    item_thumbnail BLOB NOT NULL,
    item_pictures BLOB NOT NULL,
    item_description TEXT,
    item_price INTEGER NOT NULL,
    item_sold BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY ("item_id" AUTOINCREMENT),
    FOREIGN KEY ("account_id") REFERENCES accounts ("account_id")
);

CREATE TABLE IF NOT EXISTS cart
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY ("account_id") REFERENCES accounts("account_id"),
    FOREIGN KEY ("item_id") REFERENCES items_for_sale("item_id"),
    PRIMARY KEY ("account_id", "item_id")
);

CREATE TABLE IF NOT EXISTS purchase
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
