const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("NDA store");
});
router.post("/", (req, res, next) => {
  res.send("reagent created");
});
router.get("/:id", (req, res, next) => {
  res.send("fetch reagent by id");
});

router.patch("/:id", (req, res, next) => {
  res.send("updated reagent by id");
});

router.delete("/:id", (req, res, next) => {
  res.send("deleted reagent by id");
});
module.exports = router;
