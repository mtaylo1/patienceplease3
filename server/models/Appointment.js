const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentDate: {
    type: Date,
    required: true,
  },
  // doctor: {
  //   type: Schema.Types.ObjectId,
  //   requried: true,
  //   ref: "Doctor",
  // },
  // patient: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Patient",
  // },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
