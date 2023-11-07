const express = require("express");
const {
  validateRegister,
  validateLogin,
  authenticate,
} = require("../middlewares");
const ctrl = require("../controlers/usersCtrl");

const router = express.Router();

router.post("/sign-up", validateRegister, ctrl.register);
router.post("/sign-in", validateLogin, ctrl.login);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
