const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: [String],
  category: {
    type: String,
    required: true
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
