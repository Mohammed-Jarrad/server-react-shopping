const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const cartItemSchema = new Schema({
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
	qty: {
		type: Number,
	},
	size: String,
	color: String,
});

const CartItem = model('CartItem', cartItemSchema);

module.exports = CartItem;
