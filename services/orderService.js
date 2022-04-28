const Order = require('../models/orderModel');

module.exports.getOrders = async () => {
	return await Order.find()
		.populate('user')
		.populate({
			path: 'order_info',
			populate: {
				path: 'product',
			},
		});
};

module.exports.findById = async id => {
	return await Order.findById(id)
		.populate('user')
		.populate({
			path: 'order_info',
			populate: {
				path: 'product',
			},
		});
};

module.exports.updateById = async (id, newOrder) => {
	return await Order.findByIdAndUpdate(id, newOrder, { new: true }).populate('user');
};

module.exports.createOrder = async newOrder => {
	return await Order.create(newOrder);
};

module.exports.deleteOrder = async _id => {
	return await Order.deleteOne({ _id });
};

module.exports.deleteProductFromOrder = async (product_id, color, size) => {
	return await Order.findOneAndUpdate(
		{
			'order_info.product': product_id,
			'order_info.selected_size': size,
			'order_info.selected_color': color,
		},
		{
			$pull: {
				order_info: {
					product: product_id,
					selected_size: size,
					selected_color: color,
				},
			},
		},
		{ new: true },
	);
};

module.exports.deleteProductsFromOrders = async product_id => {
	return await Order.updateMany(
		{ 'order_info.product': product_id },
		{ $pull: { order_info: { product: product_id } } },
		{ new: true },
	);
};

module.exports.deleteAllOrdersWithoutProducts = async _ => {
	return await Order.deleteMany({ order_info: [] });
};

module.exports.getOrdersForUser = async user => {
	return await Order.find({ user })
		.populate('user')
		.populate({
			path: 'order_info',
			populate: {
				path: 'product',
			},
		});
};
