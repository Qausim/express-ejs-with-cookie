const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../db/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const error = "Invalid email or password";
  let isCorrectPassword = false;
  const user = users.find(({ email: userEmail }) => email === userEmail);
  if (user) isCorrectPassword = user.password === password;

  if (!isCorrectPassword) {
    res.status(400).render("signin", { error });
  } else {
    delete user.password;
    res.cookie("token", jwt.sign(user, "tdd"));
    res.redirect("/home");
  }
});

router.get("/home", (req, res) => {
  const cookie = req.headers.cookie;
  let tokenInCookie;
  if (cookie)
    tokenInCookie = cookie.split(";").find(el => el.includes("token="));
  let token;
  if (tokenInCookie) token = tokenInCookie.split("=")[1];
  else {
    req.flash("error", "Please sign in");
    return res.redirect(400, "signin");
  }
  const user = jwt.verify(token, "tdd");
  delete user.password;
  res.render("home", { user });
});

module.exports = router;
