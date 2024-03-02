"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const knex_1 = require("knex");
class Database {
}
exports.Database = Database;
Database.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: "./src/database/db.db", //localização do seu arquivo .db
    },
    useNullAsDefault: true, // definirá NULL quando encontrar valores undefined
    pool: {
        min: 0, // número de conexões, esses valores são os recomendados para sqlite3
        max: 1,
        afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
        } // configurando para o knex forçar o check das constrainst FK
    }
});
