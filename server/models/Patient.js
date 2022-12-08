// Require schema and model from mongoose
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Construct a new instance of the schema class
const patientSchema = new Schema({
  // Configure individual properties using Schema Types
  patientFirstName: { 
    type: String, 
    required: true
  },
  patientLastName: { 
    type: String, 
    required: true
  },
  patientEmail: {
    type: String,
    unique: true,
    required: true
  },
//   patientPassword: {
// type: String,
// },
  drNotes: { 
    type: String 
  },
  appointmentNotes: { 
    type: String 
  },
  drId:{
     type: Schema.Types.ObjectId, ref: "Doctor" ,
  },
 
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]

},
  {
    toJSON: {
      getters: true
    }
  });

  patientSchema.virtual('appointmentCount').get(function() {
    return this.appointments.length;
  });
// Using mongoose.model() to compile a model based on the schema 'patientSchema'
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
