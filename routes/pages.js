const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();
const logout = require("../controllers/logOut");

router.get("/", loggedIn, (req, res) => {
  if (req.user) {
    res.render("index", { status: "loggedIn", user: req.user });
  } else {
    res.render("index", { status: "no", user: "nothing" });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", logout);

module.exports = router;
