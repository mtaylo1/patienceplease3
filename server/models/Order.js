const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  drug: [{ type: Schema.Types.ObjectId, ref: "Drug" }],
  patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
