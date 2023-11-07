const { ctrlWrapper, requestDB } = require("../helpers");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const payload = {
    email: email,
  };
  const hashPassword = await bcrypt.hash(password, 10);
  const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const newRefreshToken = jwt.sign(payload, SECRET_KEY);
  const query = `INSERT INTO users (accesstoken, refreshtoken, email, password) VALUES ($1, $2, $3, $4)`;
  const values = [accessToken, refreshToken, email, hashPassword];
  // Запис юзера в базу даних
  const client = await requestDB();
  await client.query(query, values);
  const newUser = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  client.end(console.log("Disconnected from DB!"));

  res.status(201).send({
    message: "Користувач успішно зареєстрований",
    success: true,
    data: {
      id: newUser.rows[0].id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
};

const login = async (req, res) => {
  const { email } = req.body;

  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  const payload = {
    email: email,
  };
  const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const newRefreshToken = jwt.sign(payload, SECRET_KEY);
  // Вставка нових токенів в базу даних

  const query = `UPDATE users
 SET accesstoken = $1,
    refreshtoken = $2
WHERE email = $3;`;
  await client.query(query, [newAccessToken, newRefreshToken, email]);

  client.end(console.log("Disconnected from DB!"));

  res.status(200).send({
    message: "Користувач успішно залогінився",
    success: true,
    data: {
      id: exists.rows[0].id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
};

const logout = async (req, res) => {
  const { email } = req.body;

  const newAccessToken = "";
  const newRefreshToken = "";
  // Стирання токенів з бази даних
  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  const query = `UPDATE users
 SET accesstoken = $1,
    refreshtoken = $2
WHERE email = $3;`;
  await client.query(query, [newAccessToken, newRefreshToken, email]);

  client.end(console.log("Disconnected from DB!"));

  res.status(200).send({
    message: "Користувач успішно розлогінився",
    success: true,
    data: {
      id: exists.rows[0].id,
      email: email,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const { email } = jwt.verify(token, SECRET_KEY);

  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  client.end(console.log("Disconnected from DB!"));

  res.status(200).send({
    message: "Користувач прийшов",
    success: true,
    data: {
      id: exists.rows[0].id,
      email: exists.rows[0].email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
