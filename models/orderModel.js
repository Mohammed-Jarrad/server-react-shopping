const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new Schema(
  {
    user_id: Schema.Types.ObjectId,
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    order_info: {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    }
  }
  ,
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
