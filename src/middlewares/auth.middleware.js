const { jwtVerify } = require("../utils/jwt");
const { NotAuthtorizedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const user = jwtVerify(token);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next(new NotAuthtorizedError());
  }
};

module.exports = authMiddleware;
