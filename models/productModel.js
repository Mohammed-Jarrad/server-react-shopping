const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Set Product Title'],
	},
	imageUrl: {
		type: String,
		required: [true, 'Set Product Image'],
	},
	desc: {
		type: String,
		required: [true, 'Set Product Description'],
	},
	price: {
		type: Number,
		required: [true, 'Set Product Price'],
	},
	sizes: {
		type: [String],
	},
	category: {
		type: String,
		required: [true, 'Set Product Category'],
		lowercase: true,
	},
});

const Product = model('Product', productSchema);

module.exports = Product;
