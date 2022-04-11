const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new Schema(
  {

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_info:
      [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          }, quantity: {
            type: Number,
            required: true
          }
        }
      ]
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
