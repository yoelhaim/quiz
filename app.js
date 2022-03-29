const { app, port, express } = require("./app/config/express.js");
require("./app/config/mongoose.js");
const createError = require("http-error");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./app/route/AuthenticationRoute"));
//use public html
app.use("*", async (req, res, next) => {
  if (req.baseUrl.trim() === "") {
    req.baseUrl = "index.html";
  }
  res.sendFile(path.resolve(__dirname, `./public/${req.baseUrl}`), (err) => {
    if (err) {
      res.sendFile(path.resolve(__dirname, "./public/index.html"));
    }
  });
});

app.use((req, res, next) => {
  try {
    throw createError.NotFound();
  } catch (err) {
    next(err);
  }
});

// app.use((err, req, res, next) => {
//   let error = {
//     message: err.message,
//     statusCode: err.status || 500,
//   };
//   res.status(err.status || 500);
//   res.json(error);
// });
app.listen(port, () => cl("connect success"));
