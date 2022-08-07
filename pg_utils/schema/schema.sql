CREATE TABLE IF NOT EXISTS accounts
(
    account_id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS items_for_sale
(
    account_id INTEGER NOT NULL,
    item_id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_pictures bytea NOT NULL,
    item_description TEXT,
    item_price INTEGER NOT NULL,
    FOREIGN KEY ("account_id") REFERENCES accounts ("account_id")
);

DROP FUNCTION IF EXISTS delete_account();
CREATE FUNCTION delete_account() RETURNS trigger AS $$
BEGIN
DELETE FROM items_for_sale WHERE items_for_sale.account_id = old.account_id;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS account_delete ON accounts;
CREATE TRIGGER account_delete BEFORE DELETE ON accounts EXECUTE FUNCTION delete_account();
