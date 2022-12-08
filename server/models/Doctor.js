// Require schema and model from mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order');
const { Schema } = mongoose;

// Construct a new instance of the schema class
const doctorSchema = new Schema({
  // Configure individual properties using Schema Types
  drFirstName: {
    type: String,
    required: true
  },
  drLastName: {
    type: String,
    required: true
  },
  drEmail: {
    type: String,
    required: true,
    unique: true
  },
  drPassword: {
    type: String,
    required: true,
    minlength: 5
  },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]
}
,
  {
    toJSON: {
      virtuals: true
    }
  });
doctorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('drPassword')) {
    const saltRounds = 10;
    this.drPassword = await bcrypt.hash(this.drPassword, saltRounds);
  }
  next();
});
// compare the incoming password with the hashed password
doctorSchema.methods.isCorrectPassword = async function (drPassword) {
  return await bcrypt.compare(drPassword, this.drPassword);
};

doctorSchema.virtual('patientCount').get(function() {
  return this.patients.length;
});
// Using mongoose.model() to compile a model based on the schema 'doctorSchema'
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
