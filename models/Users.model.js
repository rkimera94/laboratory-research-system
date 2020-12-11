const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    console.log("called before saving the user");
  } catch (error) {
    next(error);
  }
});

UserSchema.post("save", async function (next) {
  try {
    console.log("called after  saving the user");
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
