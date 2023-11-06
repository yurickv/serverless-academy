const express = require("express");
// const { validateBody, authenticate } = require("../../middlewares");
// const { schemas } = require("../../models/user");
const ctrl = require("../controlers/usersCtrl");

const router = express.Router();

router.post("/sign-up", ctrl.register); // register  validateBody(schemas.registerSchema),

router.post("/sign-in", ctrl.login); // validateBody(schemas.loginSchema),

// router.get("/me", authenticate, ctrl.getCurrent);

// router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
