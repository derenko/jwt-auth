const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const jwtSign = (payload) => {
  try {
    const token = jwt.sign({ ...payload }, SECRET, { expiresIn: "15m" });

    return token;
  } catch (e) {
    throw e;
  }
};

const jwtGenerateRefreshToken = (payload) => {
  try {
    const token = jwt.sign({ ...payload }, SECRET, { expiresIn: "7d" });

    return token;
  } catch (e) {
    throw e;
  }
};

const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
  jwtGenerateRefreshToken,
};
