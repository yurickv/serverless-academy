const { requestDB } = require("../helpers");
const bcrypt = require("bcrypt");

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .send({ success: false, error: "Всі поля повинні бути заповнені" });
    return;
  }

  // Перевірка, чи існує користувач з таким email
  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  client.end(console.log("Disconnected from DB!"));
  if (!exists.rows.length > 0) {
    res
      .status(409)
      .send({ success: false, error: "Користувача з таким email Не існує" });
    return;
  }

  const passwordCompare = await bcrypt.compare(
    password,
    exists.rows[0].password
  );
  if (!passwordCompare) {
    res.status(404).send({ success: false, error: "Password is wrong" });
    return;
  }

  next();
};

module.exports = validateLogin;
