const express = require("express");
const router = express.Router();
const Reagent = require("../models/reagentsModel");

router.get("/", async (req, res, next) => {
  try {
    const result = await Reagent.find({}, { __v: 0 });
    // __name:1 fields to be in te results
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const reagent = new Reagent(req.body);
    const result = await reagent.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }

  /* the promise method
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
    */
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const reagent = await Reagent.findById(id);
    // or findone() method
    res.send(reagent);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Reagent.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Reagent.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
