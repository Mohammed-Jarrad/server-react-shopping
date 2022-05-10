const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const reviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},

	comment: {
		type: String,
		required: [true, 'Please Enter a Comment !'],
	},

	rating: {
		type: String,
		required: [true, 'Please Enter a Rate !'],
	},

	date: {
		type: Date,
		default: Date.now(),
	},
});

const Review = model('Review', reviewSchema);

module.exports = Review;
