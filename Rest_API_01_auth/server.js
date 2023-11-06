const { Client } = require("pg");
const app = require("./app");

const client = new Client({
  ssl: { rejectUnauthorized: false },
  user: "postgres",
  host: "db.nqbnnolyjulonpbozyyp.supabase.co",
  database: "postgres",
  password: "jJfe$s-87)EWRZr",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  app.listen(5432);
  console.log("Connected!");
});

module.exports = { client };
