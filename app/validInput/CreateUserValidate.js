const joi = require("joi");
const validateUser = joi.object({
  username: joi.string().min(3).max(90).required(),
  f_name: joi.string().min(3).max(90).required(),
  l_name: joi.string().min(3).max(90).required(),
  email: joi.string().email().min(3).max(30).required(),
  ip_address: joi.string().min(1).max(15).required(),
  password: joi.string(),
  // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  createdAt: joi.string(),
});
module.exports = validateUser;
