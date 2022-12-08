const db = require('../config/connection');
const { Doctor, Patient, Drug, Appointment, Order } = require('../models');
const doctorSeeds = require('./doctorSeeds.json');
const patientSeeds = require('./patientSeeds.json');
const drugSeeds = require('./drugSeeds.json');
const appointmentSeeds = require('./appointmentSeeds.json');

db.once('open', async () => {
    try {
      await Doctor.deleteMany({});
      await Patient.deleteMany({});
      await Drug.deleteMany({});
      await Appointment.deleteMany({});
      await Order.deleteMany({});
  
      await Doctor.create(doctorSeeds);
  
      for (let i = 0; i < patientSeeds.length; i++) {
        const { _id, drId } = await Patient.create(patientSeeds[i]);
        const doctor = await Doctor.findOneAndUpdate(
          { _id: drId },
          {
            $addToSet: {
              patients: _id,
            },
          }
        );
      }

      await Drug.create(drugSeeds);
    
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
  });