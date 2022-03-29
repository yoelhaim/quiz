const mongoose = require("mongoose");
let validator = require("validator");
const Users = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
    max: 50,
    maxlength: 50,
    min: 3,
  },
  l_name: {
    type: String,
    required: true,
    max: 50,
    maxlength: 50,
    min: 3,
  },
  username: {
    type: String,
    required: true,
    max: 90,
    maxlength: 90,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  number_users: {
    type: String,
    default: 0,
  },
  ip_address: {
    type: String,
    required: true,
  },
});
const users = mongoose.model("users", Users);
module.exports = { users };
