const { createDb, migrate } = require('postgres-migrations');

const databaseName = "resdb"

let runMigration = async  () => {
  const dbConfig = {
    database: "resdb",
    user: "postgres",
    password: "docker",
    host: "localhost",
    port: 5432
  }

  try {
    await createDb("resdb", {
      ...dbConfig,
    });
    await migrate(dbConfig, "./migrations");
  } catch(e) {
    console.error('There was an error running migrations: ', e)
  }
}

runMigration();
