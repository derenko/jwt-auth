const User = require("../database/models/user.model");

const find = async (query) => {
  return await User.findOne(query);
};

const create = async (user) => {
  return await new User(user).save();
};

module.exports = {
  find,
  create,
};
