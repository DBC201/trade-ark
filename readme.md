# TRADE ARK

- Create a file called .env.local in project root and set environment variables
    - Ex:
    ```
    abs_db_path="C:\Users\dbc20\Documents\github\trade-ark\sqlite\database.db"

    session_secret="af4a0399aec7d17471d374550fa41199"

    http_port=80
    ```
    - https values can be left blank
- Run ```node overwrite_database.js```
- Run ```node main.js```
