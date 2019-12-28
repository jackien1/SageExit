const mongoose = require("mongoose");

const User = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  studentId: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
