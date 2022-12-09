const { Appointment, Doctor, Patient, Order, Drug } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        me: async (parent, args) => {
            if (context.doctor) {
                const doctorData = await Doctor.findOne({ _id: context.doctor._id })
                    .select('-__v -drPassword')
                    .populate('patients')
                    .populate('appointments');

                return doctorData;
            }

            throw new AuthenticationError('Not logged in');
        },
        doctors: async () => {
            return Doctor.find()
                .select('-__v -drPassword')
                .populate('patients')
                .populate('appointments');
        },
        drugs: async () => {
            return Drug.find();
        },
        patient: async (parent, { _id }) => {
            return Patient.findOne({ _id: _id });
        },
        patients: async () => {
            return Patient.find();
        },
        doctor: async (parent, { _id }) => {

            const doctorData = await Doctor.findOne({ _id: _id })
                .select('-__v -drPassword')
                .populate('patient')
                .populate('appointments');

            console.log(doctorData)
            return doctorData;



        }


    },
    Mutation: {
        addDoctor: async (parent, args) => {
            const doctor = await Doctor.create(args);
            const token = signToken(doctor);
            return { token, doctor };
        },
        addOrder: async (parent, { drugs }, context) => {
            console.log(context);
            if (context.doctor) {
                const order = new Order({ drugs });

                await Doctor.findByIdAndUpdate(context.doctor._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        updateDoctor: async (parent, args, context) => {
            if (context.doctor) {
                return await Doctor.findByIdAndUpdate(context.doctor._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        updateDrug: async (parent, { _id, inventory }) => {
            const decrement = Math.abs(inventory) * -1;

            return await Drug.findByIdAndUpdate(_id, { $inc: { inventory: decrement } }, { new: true });
        },
        addDrug: async (parent, args, context) => {
            const drug = await Drug.create(args);

            return drug;
        },
        addPatient: async (parent, args, context) => {
            const patient = await Patient.create(args);
            const doctor = await Doctor.findByIdAndUpdate(args.drId,
                { $push: { patients: patient._id } }
            )

            // await doctor.patients.push(patient)

            return patient;
        },
        addNote: async () => {

        },

        login: async (parent, { drEmail, drPassword }) => {
            const doctor = await Doctor.findOne({ drEmail });

            if (!doctor) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await doctor.isCorrectPassword(drPassword);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(doctor);

            return { token, doctor };
        },
        deletePatients: async (parent, { _id }) => {
            return await Patient.findByIdAndDelete(__dirname);
        },


    }
}
module.exports = resolvers