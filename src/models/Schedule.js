const mongoose = require("mongoose");

const Schedule = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    required: true
  },
  aBlock: {
    type: String,
    unique: true,
    required: true
  },
  bBlock: {
    type: String,
    unique: true,
    required: true
  },
  cBlock: {
    type: String,
    unique: true,
    required: true
  },
  dBlock: {
    type: String,
    unique: true,
    required: true
  },
  eBlock: {
    type: String,
    unique: true,
    required: true
  },
  fBlock: {
    type: String,
    unique: true,
    required: true
  },
  gBlock: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const ScheduleModel = mongoose.model("Schedule", Schedule);
module.exports = ScheduleModel;
