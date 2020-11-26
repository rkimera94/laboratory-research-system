const express = require("express");
const router = express.Router();
const Reagent = require("../models/reagentsModel");

router.get("/", (req, res, next) => {
  res.send("NDA store");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const reagent = new Reagent({
    reagent_name: req.body.reagent_name,
    reagent_manufacturer: req.body.reagent_manufacturer,
    reagent_grade: req.body.reagent_grade,
    percentage_purity: req.body.percentage_purity,
    supplier: req.body.supplier,
  });
  reagent
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
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
