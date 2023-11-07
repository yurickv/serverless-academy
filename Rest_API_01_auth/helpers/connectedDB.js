const { Client } = require("pg");
const { DB_PASSWORD } = process.env;

async function requestDB() {
  const client = new Client({
    ssl: { rejectUnauthorized: false },
    user: "postgres",
    host: "db.nqbnnolyjulonpbozyyp.supabase.co",
    database: "postgres",
    password: DB_PASSWORD,
    port: 5432,
  });
  client.connect(function (err) {
    if (err) throw err;

    console.log("Connected to DataBase!");
  });

  return client;
}
module.exports = requestDB;
