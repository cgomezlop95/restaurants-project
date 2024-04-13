const express = require("express");
const PORT = 5000;
const router = require("./routes");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require("http-errors");
require("./config/passport");

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
