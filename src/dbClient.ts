const {  Pool } = require('pg');
// TODO: this is a mess..
// secrets should be pulled from .env
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'resdb'
});

export const dbClient = {
  query: (text, params ) => pool.query(text, params)
}
