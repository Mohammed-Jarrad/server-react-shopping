const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, 'required, please set product title'],
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
	imageUrl: {
		type: String,
		required: [true, 'required, please set product image'],
	},
	cloudinary_id: String,
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
					required: [true, 'please set comment !'],
				},
				rating: {
					type: String,
					required: [true, 'please set rating !'],
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
