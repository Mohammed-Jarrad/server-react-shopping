const express = require('express');
const OrderService = require('../services/orderService');

const handleCreateErrors = e => {
	let errors = {};

	if (e.name === 'ValidationError') {
		Object.values(e.errors).forEach(({ path, message }) => {
			errors[path] = message;
		});
	}

	return errors;
};

module.exports.getOrders = async (req = express.request, res = express.response) => {
	try {
		const orders = await OrderService.getOrders();
		res.status(200).json({ orders });
	} catch (e) {
		const errors = `faild to get all Orders, err: ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.findOrder = async (req = express.request, res = express.response) => {
	try {
		const order = await OrderService.findById(req.params.id);
		res.status(200).json({ order });
	} catch (e) {
		const errors = `faild to get Order with id ${req.params.id}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.getOrdersForUser = async (req = express.request, res = express.response) => {
	try {
		const orders = await OrderService.getOrdersForUser(res.locals.userID);
		res.status(200).json({ orders });
	} catch (e) {
		const errors = `faild to get Orders for user with id ${res.locals.userID}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.createOrder = async (req = express.request, res = express.response) => {
	try {
		const order = await OrderService.createOrder({
			...req.body,
			user: res.locals.userID,
		});
		res.status(201).json({ order });
	} catch (e) {
		const errors = handleCreateErrors(e);
		res.status(400).json({ errors });
		console.log(errors);
	}
};

module.exports.deleteOrder = async (req = express.request, res = express.response) => {
	try {
		const result = await OrderService.deleteOrder(req.params.id);
		result.deletedCount != 0
			? res.status(202).json('Deleted Success')
			: res.status(400).json('Faild to delete the Order');
	} catch (e) {
		const errors = `Faild to delete Order with Id ${req.params.id}, error: ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.deleteProductFromOrder = async (req = express.request, res = express.response) => {
	try {
		let size = req.body.size;
		let color = req.body.color;
		let id = req.params.id;
		const result = await OrderService.deleteProductFromOrder(id, color, size);
		res.status(200).json({ order: result });
	} catch (e) {
		const errors = `Faild to delete product from order with Id ${req.params.id}, error: ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.updateOrder = async (req = express.request, res = express.response) => {
	try {
		const order = await OrderService.updateById(req.params.id, req.body);
		res.status(200).json({ order });
	} catch (e) {
		const errors = `faild to update Order with id ${req.params.id}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.getOrdersForUserByStatus = async (req = express.request, res = express.response) => {
	try {
		const orders = await OrderService.getOrdersForUserByStatus(res.locals.userID, req.body.status);
		res.status(200).json({ orders });
	} catch (e) {
		const errors = `faild to get orders with status ${req.body.status} with id ${req.params.id}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.getAllOrdersByStatus = async (req = express.request, res = express.response) => {
	try {
		const orders = await OrderService.getAllOrdersByStatus(req.body.status);
		res.status(200).json({ orders });
	} catch (e) {
		const errors = `faild to get orders with status ${req.body.status}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.getAllOrdersByStatus = async (req = express.request, res = express.response) => {
	try {
		const orders = await OrderService.getAllOrdersByStatus(req.body.status);
		res.status(200).json({ orders });
	} catch (e) {
		const errors = `faild to get orders with status ${req.body.status}, err" ${e.message}`;
		res.status(400).json({ errors });
	}
};
