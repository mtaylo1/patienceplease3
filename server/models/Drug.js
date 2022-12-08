// Require schema and model from mongoose
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Construct a new instance of the schema class
const drugSchema = new Schema({
  // Configure individual properties using Schema Types
    drugName:{
        type:String
    },
    inventory:{
        type:Number
    },
    dinNumber:{
        type:String,
        match: [/^[0-9]{8}$/, 'Must use a valid 8 digit DIN number'],
    },
    description:{
        type:String
    }
});

// Using mongoose.model() to compile a model based on the schema 'patientSchema'
const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;
