const express = require("express");
const app = express();
global.routes = express.Router();
const port = process.env.PORT | 3000;
global.cl = async (value) => {
  console.log(value);
};
module.exports = { app, port, cl, routes, express };
