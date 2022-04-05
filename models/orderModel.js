const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new Schema(
  {
    
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
