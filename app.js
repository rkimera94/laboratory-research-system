const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const createError = require("http-errors");
const app = express();

/// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// variable
const PORT = process.env.PORT || 3040;

/**
 * initialize mangoDB
 *
 * */

// local connection
/*
mongoose
  .connect("mongodb://localhost:27017/tutorial_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected.......");
  });
  */

//connecting to the online server
//mongoose.connect();
//mongodb+srv://rkimera94:<password>@cluster0.f8q5u.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: process.env.DB_USER,
    user: process.env.MONGO_DB_NAME,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected.......");
  })
  .catch((err) => console.log(err));

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
