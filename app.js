const express = require("express");
const app = express();

const ReagentsRoute = require("./Routes/ReagentsRoute");

app.use("/reagents", ReagentsRoute);
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
  const err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
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

app.listen(3040, () => {
  console.log("Serve started at prot 3040");
});
