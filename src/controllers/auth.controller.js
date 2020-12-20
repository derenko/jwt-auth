const bcrypt = require("bcrypt");
const { jwtSign, jwtGenerateRefreshToken, jwtVerify } = require("../utils/jwt");

const { AuthorizationError, InvalidTokenError } = require("../errors");
const registerSchema = require("../validations/register.schema");
const loginSchema = require("../validations/login.schema");
const User = require("../database/models/user.model");

const login = async (req, res, next) => {
  try {
    let { password, username } = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({
      username,
    });

    if (!user) {
      throw new AuthorizationError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const accessToken = jwtSign({ _id: user._id, username: user.username });
      const refreshToken = jwtGenerateRefreshToken({
        _id: user._id,
        username: user.username,
      });
      res.json({ accessToken, refreshToken });
    } else {
      throw new AuthorizationError();
    }
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    let { password, username } = await registerSchema.validateAsync(req.body);

    password = await bcrypt.hash(password, 12);

    const { _id } = await new User({
      password,
      username,
    }).save();

    const accessToken = jwtSign({ _id, username });
    const refreshToken = jwtGenerateRefreshToken({ _id, username });

    res.json({ accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const { _id, username } = jwtVerify(refreshToken);

    const accessToken = jwtSign({ _id, username });
    const newRefreshToken = jwtGenerateRefreshToken({ _id, username });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (e) {
    next(new InvalidTokenError());
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
