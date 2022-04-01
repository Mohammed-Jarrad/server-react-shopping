import { Schema, model } from 'mongoose'

const orderSchema = Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    orderInfo: [{ title: String, quantity: String }],
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
