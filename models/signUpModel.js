const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  qulification: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("User", signUpSchema);
module.exports = Users;
