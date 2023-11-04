const { Client } = require("pg");
const app = require("./app");

const client = new Client({
  ssl: { rejectUnauthorized: false },
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "0286",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  app.listen(5432);
  console.log("Connected!");
});

module.exports = { client };
