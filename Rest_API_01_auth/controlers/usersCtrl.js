const client = require("../server");

// async function registerUserReq(name, email, password) {
//   const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
//   const values = [name, email, password];

//   // Перевірте, чи існує користувач з таким email
//   const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
//     email,
//   ]);

//   // Якщо користувач існує, відхиліть реєстрацію
//   if (exists.rows.length > 0) {
//     return;
//   }

//   // Вставте дані в базу даних
//   await client.query(query, values);
// }

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Перевірте, чи всі поля заповнені
  if (!name || !email || !password) {
    res.status(400).send({
      error: "Всі поля повинні бути заповнені",
    });
    return;
  }

  // Перевірте, чи існує користувач з таким email
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  // Якщо користувач існує, відхиліть реєстрацію , функція відправить відповідь з кодом 409.
  if (exists.rows.length > 0) {
    res.status(409).send({
      error: "Користувач з таким email вже існує",
    });
    return;
  }
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
  const values = [name, email, password];
  // Вставте дані в базу даних
  //   await registerUserReq(name, email, password);
  await client.query(query, values);
  // Відправте успішний відповідь
  res.status(200).send({
    message: "Користувач успішно зареєстрований",
  });
};
