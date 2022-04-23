const express = require('express');
const OrderService = require('../services/orderService');

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
		const order = await OrderService.createOrder({ ...req.body, user: res.locals.userID });
		res.status(201).json({ order });
	} catch (e) {
		const errors = `faild to create a new Order, err" ${e.message}`;
		res.status(400).json({ errors });
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

module.exports.deleteOrderWhenProductDeleted = async (req = express.request, res = express.response) => {
	try {
		const result = await OrderService.deleteOrderWhenProductDeleted(req.params.id);
		result.deletedCount != 0
			? res.status(202).json('Deleted Success')
			: res.status(202).json('No orders with the same Product id');
	} catch (e) {
		const errors = `Faild to delete Order with Product Id ${req.params.id}, error: ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.deleteProductFromOrder = async (req = express.request, res = express.response) => {
	try {
		const result = await OrderService.deleteProductFromOrder(req.params.order_id);
		res.status(200).json({ order: result });
	} catch (e) {
		const errors = `Faild to delete product from order with Id ${req.params.order_id}, error: ${e.message}`;
		res.status(400).json({ errors });
	}
};

module.exports.updateOrder = async (req = express.request, res = express.response) => {
	try {
		const order = await OrderService.updateById(req.params.id, req.body);
		res.status(200).json({ order });
	} catch (e) {
		const errors = `faild to update Order with id ${req.params.id}, err" ${e.message}`;
		res.status(404).json({ errors });
	}
};
