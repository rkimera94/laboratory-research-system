const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReagentSchema = new Schema({
  reagent_name: {
    type: String,
    required: true,
  },
  reagent_manufacturer: {
    type: String,
    required: true,
  },
  reagent_grade: {
    type: String,
  },
  percentage_purity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
  },
  /*
  date:{
      type:Date,default Date.now
  }
*/
});
const Reagent = mongoose.model("reagent", ReagentSchema);

module.exports = Reagent;
