-- Active: 1707650230331@@127.0.0.1@3306
CREATE TABLE
    IF NOT EXISTS visitor (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        gender TEXT NOT NULL,
        age TEXT NOT NULL,
        profession TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    visitor (
        id,
        name,
        cpf,
        gender,
        age,
        profession,
        city,
        state
    )
VALUES
    (
        'v001',
        'Francisco Davi Carneiro Brito',
        '061.718.213-22',
        'Masculino',
        27,
        'Programador',
        'Fortaleza',
        'CE'
    );

CREATE TABLE
    IF NOT EXISTS user (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    user (id, name, role, cpf, email, password, created_at)
VALUES
    (
        'u001',
        'David Brito',
        'ADMINISTRADOR',
        '061.718.213-22',
        'davidbrito.carneiro458@gmail.com',
        'Davi1234',
        CURRENT_TIMESTAMP
    );

SELECT
    *
FROM
    user;

    UPDATE FROM "user"
    SET password = "davi1234"

CREATE TABLE
    IF NOT EXISTS registro (
        id_visitor TEXT NOT NULL,
        date_visit TEXT NOT NULL,
        FOREIGN KEY (id_visitor) REFERENCES visitor (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

SELECT
    *
FROM
    visitor;

SELECT
    COUNT(*) AS total
FROM
   registro;

CREATE TABLE IF NOT EXISTS visitors_block(
    id TEXT NOT NULL PRIMARY KEY,
    id_visitor TEXT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY(id_visitor) REFERENCES visitor(id) ON UPDATE CASCADE ON DELETE CASCADE
);


SELECT * FROM visitors_block;

SELECT * FROM user;


