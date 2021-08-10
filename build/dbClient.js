"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = void 0;
var Pool = require('pg').Pool;
// TODO: this is a mess..
// secrets should be pulled from .env
var pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'resdb'
});
exports.dbClient = {
    query: function (text, params) { return pool.query(text, params); }
};
