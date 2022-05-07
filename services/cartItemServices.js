const CartItem = require("../models/carItemModel");

module.exports.addToCart = async (user_id, newProduct_id, size, color) => {
	// return await CartItem.findOne({product: newProduct_id, size, color});
	const result = await CartItem.findOne({product: newProduct_id});
	if (result === null) {
		return await CartItem.create({
			user: user_id,
			product: newProduct_id,
			size: size,
			color: color,
			qty: 1,
		});
	} else {
		return await CartItem.updateOne({product: result.product}, {qty: result.qty + 1}, {new: true});
	}
};
module.exports.getCartItems = async _ => {
	return await CartItem.find();
};
module.exports.plusQtyItem = async itemId => {
	const item = await CartItem.findOne({_id: itemId});
	return await CartItem.updateOne({_id: item._id}, {qty: item.qty + 1}, {new: true});
};
module.exports.minusQtyItem = async itemId => {
	const item = await CartItem.findOne({_id: itemId});
	return await CartItem.updateOne({_id: item._id}, {qty: item.qty - 1}, {new: true});
};
