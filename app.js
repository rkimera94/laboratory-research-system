const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  res.send("I am the home route");
});
app.post("/", (req, res, next) => {});

app.listen(3040, () => {
  console.log("Serve started at prot 3040");
});
