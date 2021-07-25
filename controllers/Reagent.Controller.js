const Reagent = require("../models/reagentsModel");
const mongoose = require("mongoose");
const createError = require("http-errors");
module.exports = {
  /**
   * find all reagents
   */
  findAllReagents: async (req, res, next) => {
    try {
      const result = await Reagent.find({}, { __v: 0 });
      // __name:1 fields to be in te results
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  /**find reagent by id
   *
   */

  findReagentByID: async (req, res, next) => {
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
  },

  /**
   * delete reagents
   */
  deleteReagent: async (req, res, next) => {
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
  },

  /**
   *
   * create reagent
   */

  createReagent: async (req, res, next) => {
    try {
      const reagent = new Reagent(req.body);
      const result = await reagent.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  /**
   * update
   */
  updateReagent: async (req, res, next) => {
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
  },
};
