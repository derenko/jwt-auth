const { Router } = require("express");
const router = new Router();

const {
  login,
  register,
  refreshToken,
} = require("../controllers/auth.controller");

router.post("/login", login);

router.post("/register", register);

router.post("/refresh-token", refreshToken);

module.exports = router;
