const Token = require("../database/models/token.model");

const find = async (token) => {
  return await Token.findOne({ token });
};

const create = async ({ token, userId }) => {
  return await new Token({
    token,
    userId,
  }).save();
};

const remove = async (query) => {
  return await Token.deleteMany(query);
};

module.exports = {
  find,
  create,
  remove,
};
