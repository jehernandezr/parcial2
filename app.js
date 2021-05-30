var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var usersRouter = require("./routes/users");
var homesRouter = require("./routes/homes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "front/build")));
const { connect } = require("./lib/utils/mongo_root");
connect();

app.use("/api/users", usersRouter);
app.use("/api/homes", homesRouter);

/**
 * app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front/build/index.html"));
});

 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
