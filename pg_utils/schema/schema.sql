CREATE TABLE IF NOT EXISTS accounts
(
    account_id SERIAL NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL
);