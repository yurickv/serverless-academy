const express = require("express");
require("dotenv").config();
const cors = require("cors");
// require("dotenv").config();

// const userRouter = require("./routes/user");
const app = express();

const authRouter = require("./routes/auth");

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/me", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found 404" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
