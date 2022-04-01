import { Schema, model } from 'mongoose';

const productSchema = Schema({
  user_id: Schema.Types.ObjectId,
  title: String,
  imageUrl: String,
  desc: String,
  price: Number,
  sizes: [String],
});
const Product = model("Product", productSchema);

export default Product;
