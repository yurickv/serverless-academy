const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found 404" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
