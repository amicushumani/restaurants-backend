const {  Pool } = require('pg');
// TODO: this is a mess..
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'resdb'
});

module.exports = {
  query: (text, params ) => pool.query(text, params)
}
