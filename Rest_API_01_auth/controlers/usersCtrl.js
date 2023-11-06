const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, DB_PASSWORD } = process.env;

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

  console.log("Connected!");
});

const register = async (req, res) => {
  const { email, password } = req.body;
  // Перевірте, чи всі поля заповнені
  if (!email || !password) {
    res.status(400).send({
      error: "Всі поля повинні бути заповнені",
    });
    return;
  }
  // Перевірте, чи існує користувач з таким email
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  // Якщо користувач існує, відхиліть реєстрацію, функція відправить відповідь з кодом 409.
  if (exists.rows.length > 0) {
    res
      .status(409)
      .send({ success: false, error: "Користувач з таким email вже існує" });
    return;
  }
  const payload = {
    email: email,
  };
  const hashPassword = await bcrypt.hash(password, 10);
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, SECRET_KEY);
  const query = `INSERT INTO users (accesstoken, refreshtoken, email, password) VALUES ($1, $2, $3, $4)`;
  const values = [accessToken, refreshToken, email, hashPassword];
  // Вставте дані в базу даних

  await client.query(query, values);
  const write = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  // console.log(write.rows[0].id);
  // Відправте успішну відповідь
  res.status(201).send({
    message: "Користувач успішно зареєстрований",
    success: true,
    data: {
      id: write.rows[0].id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Перевірте, чи всі поля заповнені
  if (!email || !password) {
    res.status(400).send({
      error: "Всі поля повинні бути заповнені",
    });
    return;
  }
  // Перевірте, чи існує користувач з таким email
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  // Якщо користувач не існує, відхиліть авторизацію, функція відправить відповідь з кодом 404.
  if (!exists.rows.length > 0) {
    res
      .status(404)
      .send({ success: false, error: "Користувача з таким email не існує" });
    return;
  }
  const { id, refreshtoken } = exists.rows[0];
  // перевірка пароля
  const passwordCompare = await bcrypt.compare(
    password,
    exists.rows[0].password
  );
  if (!passwordCompare) {
    res.status(404).send({ success: false, error: "Password is wrong" });
    return;
  }

  const payload = {
    email: email,
  };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  // Вставте новий accessToken в базу даних
  const query = `UPDATE users
SET accesstoken = ${accessToken}
WHERE id = ${id};`;
  await client.query(query);

  // Відправте успішну відповідь
  res.status(200).send({
    message: "Користувач успішно залогінився",
    success: true,
    data: {
      id: id,
      accessToken: accessToken,
      refreshToken: refreshtoken,
    },
  });
};

module.exports = { register: ctrlWrapper(register), login: ctrlWrapper(login) };
