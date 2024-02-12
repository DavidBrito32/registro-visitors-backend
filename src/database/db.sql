-- Active: 1707650230331@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS visitor(
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

INSERT INTO visitor(id, name, cpf, gender, age, profession, city, state)
VALUES
('v001', 'Francisco Davi Carneiro Brito', '061.718.213-22', 'Masculino', 27, 'Programador', 'Fortaleza', 'CE');

CREATE TABLE IF NOT EXISTS user(
    id INTEGER NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);