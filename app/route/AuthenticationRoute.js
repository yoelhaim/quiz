const { CreateAccount, loginUser } = require("../controllers/authentication");
routes.post("/", CreateAccount);
routes.post("/login", loginUser);
module.exports = routes;
