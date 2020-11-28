const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
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
    if (!reagent) {
      throw createError(404, "reagent not found");
    }
    res.send(reagent);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Reagent.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, "reagent not found");
    }
    res.send(result);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid reagent id"));
      return;
    }
    console.log(error.message);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Reagent.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, "reagent not found");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});
module.exports = router;
