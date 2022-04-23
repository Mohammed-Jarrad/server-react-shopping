const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, 'required, please set product title'],
	},
	imageUrl: {
		type: String,
		required: [true, 'required, please set product image'],
	},
	desc: {
		type: String,
		required: [true, 'required, please set product description'],
	},
	price: {
		type: Number,
		required: [true, 'required, please set product price'],
	},
	sizes: {
		type: [String],
	},
	category: {
		type: String,
		required: [true, 'required, pleast set product category'],
		lowercase: true,
	},
});

const Product = model('Product', productSchema);

module.exports = Product;
