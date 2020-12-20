const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.string().required().valid(Joi.ref("password")),
});

module.exports = schema;
