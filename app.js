const express = require("express");
const app = express();

const ReagentsRoute = require("./Routes/ReagentsRoute");

app.listen(3040, () => {
  console.log("Serve started at prot 3040");
});
