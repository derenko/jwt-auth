const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuid } = require("uuid");

const refreshTokenService = require("../services/refreshToken.service");

const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (e) {
    throw e;
  }
};

const issueTokenPair = async (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, SECRET, { expiresIn: "15m" });

    const refreshToken = uuid();

    await refreshTokenService.create({
      token: refreshToken,
      userId,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    throw error;
  }
};

module.exports = {
  jwtVerify,
  issueTokenPair,
};
