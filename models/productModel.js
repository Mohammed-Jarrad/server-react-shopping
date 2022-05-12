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
	colors: {
		type: [String],
		// validate: [v => Array.isArray(v) && v.length > 0, 'required, please set product colors'],
	},
	category: {
		type: String,
		required: [true, 'required, please set product category'],
		lowercase: true,
	},
	status: {
		type: String,
		default: 'Available',
	},
	discount: {
		type: Number,
		default: 0,
	},
	reviews: {
		type: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
				rating: {
					type: String,
					required: true,
				},
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
});

const Product = model('Product', productSchema);

module.exports = Product;
