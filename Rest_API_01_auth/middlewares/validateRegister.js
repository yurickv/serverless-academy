const { requestDB } = require("../helpers");

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return regex.test(password);
};
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validateRegister = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .send({ success: false, error: "Всі поля повинні бути заповнені" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).send({
      success: false,
      error:
        "Пароль повинен містити принаймні одну малу літеру, одну велику літеру, одну цифру та бути не менше 8 символів.",
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).send({
      success: false,
      error: "Введений Email не відповідає формату електронної адреси",
    });
    return;
  }

  // Перевірка, чи існує користувач з таким email
  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  client.end(console.log("Disconnected from DB!"));
  if (exists.rows.length > 0) {
    res
      .status(409)
      .send({ success: false, error: "Користувач з таким email вже існує" });
    return;
  }

  next();
};

module.exports = validateRegister;
