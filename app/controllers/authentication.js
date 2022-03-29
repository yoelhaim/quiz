const { cl } = require("../config/express");
const { users } = require("../model/userModel");
const validateUser = require("../validInput/CreateUserValidate");
const createError = require("http-error");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const CreateAccount = async (req, res, next) => {
  try {
    const body = req.body;
    await validateUser.validateAsync(body);
    let data = await validateUser.validate(body);

    // res.send(data.error.details[0].message);
    if (data.error) {
      throw createError.Forbidden(`jj ${data.error.details[0].message}`);
    }
    const checkLentuser = await users.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });
    if (checkLentuser) {
      return res.json(`user aready exect `);
    }
    data = data.value;
    bcrypt.hash(data.password, 10, async (err, hash) => {
      data.password = hash;
      data.createdAt = Date.now();
      const addthisUser = new users(data);
      await addthisUser.save();
      if (addthisUser) {
        res.send(addthisUser);
      }
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    let body = req.body;
    const lognin = await users
      .findOne({ email: body.email })
      .select("password");
    if (lognin) {
      bcrypt.compare(body.password, lognin.password, async (err, result) => {
        if (err) {
          // throw createError.Forbidden("user not found ");
          console.log(err);
          return "error compare ";
        } else {
          const token = jwt.sign({ id: lognin._id }, process.env.CODE_SECRET, {
            expiresIn: 86400 * 60,
          });

          if (token) {
            lognin.password = 0;
            res.send({ token, lognin });
          } else {
            console.log("cmpw");
            return "errr token ";
          }
        }
      });
    } else {
      console.log("cmps");
      return "user not found ";
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { CreateAccount, loginUser };
