const { Router } = require("express");
const router = new Router();
const bodyParser = require("body-parser");
const { compareSync, hashSync } = require("bcrypt");

const userService = require("../../services/user.service");
const refreshTokenService = require("../../services/refreshToken.service");
const loginSchema = require("../../validations/login.schema");
const registerSchema = require("../../validations/register.schema");
const { issueTokenPair } = require("../../utils/jwt");
const { AuthorizationError, InvalidTokenError } = require("../../errors");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/login", bodyParser.json(), async (req, res, next) => {
  try {
    let { password, username } = await loginSchema.validateAsync(req.body);

    const user = await userService.find({ username });

    if (!user || !compareSync(password, user.password)) {
      throw new AuthorizationError();
    }

    res.json({
      ...(await issueTokenPair(user._id)),
    });
  } catch (e) {
    next(e);
  }
});

router.post("/register", bodyParser.json(), async (req, res, next) => {
  try {
    let { password, username } = await registerSchema.validateAsync(req.body);

    const user = await userService.create({
      password: hashSync(password, 12),
      username,
    });

    res.json({ ...(await issueTokenPair(user._id)) });
  } catch (e) {
    next(e);
  }
});

router.post("/refresh", bodyParser.json(), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const dbToken = await refreshTokenService.find(refreshToken);

    if (!dbToken) {
      throw InvalidTokenError();
    }

    await refreshTokenService.remove({
      token: dbToken.token,
    });

    await res.json({ ...(await issueTokenPair(dbToken.userId)) });
  } catch (e) {
    next(new InvalidTokenError());
  }
});

router.post("/logout", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    await refreshTokenService.remove({ userId });

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
