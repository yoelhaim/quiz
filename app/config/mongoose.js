const mongoose = require("mongoose");
require("dotenv").config();
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let mongoDB = `${process.env.SRV}${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose
  .connect(mongoDB, option)
  .then((res) => {
    cl("connect success mongo");
  })
  .catch((err) => console.log(`error ${err}`));
module.exports = db;
