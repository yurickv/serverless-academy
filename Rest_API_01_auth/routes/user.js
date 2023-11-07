const express = require("express");
const { authenticate } = require("../middlewares");
const { getCurrentUser } = require("../controlers/usersCtrl");

const router = express.Router();

router.get("/me", authenticate, getCurrentUser); //authenticate,

module.exports = router;
