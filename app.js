const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./helpers/init_mongodb");

const createError = require("http-errors");
const app = express();

/// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// variable
const PORT = process.env.PORT || 3040;

//register routes
//for handling all routes GET,POST,ETC...
app.all("/test", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.all("/test/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
/**
 *
 * routes
 */
const ReagentsRoute = require("./Routes/ReagentsRoute");
app.use("/reagents", ReagentsRoute);
// auth
// auth route
const authRoute = require("./Routes/AuthRoute");
app.use("/auth", authRoute);
// middle  ware to handle routes that are not handled by the routes
/*
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: "Not found",
  });
});
*/

// using express error handlers
app.use((req, res, next) => {
  // const err = new Error("NOT FOUND");
  // err.status = 404;
  // next(err);
  next(createError(404, "Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log("Serve started at port " + PORT + ".....");
});
