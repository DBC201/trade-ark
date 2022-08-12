DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS items_for_sale;
DROP TABLE IF EXISTS accounts;
DROP FUNCTION IF EXISTS delete_account();

CREATE TABLE accounts
(
    account_id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL
);

CREATE TABLE items_for_sale
(
    account_id INTEGER NOT NULL,
    item_id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_thumbnail bytea NOT NULL,
    item_pictures bytea NOT NULL,
    item_description TEXT,
    item_price INTEGER NOT NULL,
    item_sold BOOLEAN NOT NULL DEFAULT FALSE,
    buyer_id INTEGER,
    FOREIGN KEY ("account_id") REFERENCES accounts ("account_id"),
    FOREIGN KEY ("buyer_id") REFERENCES accounts ("account_id")
);

CREATE TABLE cart
(
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY ("account_id") REFERENCES accounts("account_id"),
    FOREIGN KEY ("item_id") REFERENCES items_for_sale("item_id"),
    PRIMARY KEY ("account_id", "item_id")
);

CREATE FUNCTION delete_account() RETURNS trigger AS $$
    BEGIN
        DELETE FROM cart WHERE cart.account_id = old.account_id;
        DELETE FROM items_for_sale WHERE items_for_sale.account_id = old.account_id;
    END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION purchase_remove() RETURNS trigger AS $$
    BEGIN
        DELETE FROM cart WHERE new.buyer_id = cart.account_id AND old.item_id = cart.item_id;
    END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS account_delete ON accounts;
CREATE TRIGGER account_delete BEFORE DELETE ON accounts EXECUTE FUNCTION delete_account();

DROP TRIGGER IF EXISTS item_sold ON items_for_sale;
CREATE TRIGGER item_sold AFTER UPDATE OF item_sold ON items_for_sale WHEN ( new.item_sold=TRUE AND old.item_sold=FALSE ) EXECUTE FUNCTION purchase_remove();
