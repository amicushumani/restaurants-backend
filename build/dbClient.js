var Pool = require('pg').Pool;
// TODO: this is a mess..
var pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'resdb'
});
module.exports = {
    query: function (text, params) { return pool.query(text, params); }
};
