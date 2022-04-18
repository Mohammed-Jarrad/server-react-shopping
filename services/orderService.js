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

module.exports.deleteOrderWhenProductDeleted = async product_id => {
	return await Order.deleteMany({
		'order_info.product': product_id,
	});
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
