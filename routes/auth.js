const express = require("express");
const authController = require("../controllers/authRegister");
const authControllerLogin = require("../controllers/authLogin");
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authControllerLogin.login);

module.exports = router;
