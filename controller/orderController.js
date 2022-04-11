const express = require("express");
// const Router = express.Router;
const OrderService = require("../services/orderService");
const orderService = new OrderService();

module.exports.getOrders = async (req = express.request, res = express.response) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json({ orders });
    } catch (e) {
        const errors = `faild to get all Orders, err: ${e.message}`;
        res.status(400).json({ errors });
    }
};

module.exports.findOrder = async (req = express.request, res = express.response) => {
    try {
        const order = await orderService.findById(req.params.id);
        res.status(200).json({ order });
    } catch (e) {
        const errors = `faild to get Order with id ${req.params.id}, err" ${e.message}`;
        res.status(400).json({ errors });
    }
};

module.exports.getOrdersForUser = async (req = express.request, res = express.response) => {
    try {
        const orders = await orderService.getOrdersForUser(res.locals.userID);
        res.status(200).json({ orders });
    } catch (e) {
        const errors = `faild to get Orders for user with id ${res.locals.userID}, err" ${e.message}`;
        res.status(400).json({ errors });
    }
};

module.exports.createOrder = async (req = express.request, res = express.response) => {
    try {
        const order = await orderService.createOrder({ ...req.body, user: res.locals.userID });
        res.status(201).json({ order });
    } catch (e) {
        const errors = `faild to create a new Order, err" ${e.message}`;
        res.status(400).json({ errors });
    }
};

module.exports.deleteOrder = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.deleteOrder(req.params.id);
        result.deletedCount != 0
            ? res.status(202).json("Deleted Success")
            : res.status(400).json("Faild to delete the Order");
    } catch (e) {
        const errors = `Faild to delete Order with Id ${req.params.id}, error: ${e.message}`;
        res.status(400).json({ errors });
    }
};

module.exports.deleteOrderWhenProductDeleted = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.deleteOrderWhenProductDeleted(req.params.id);
        result.deletedCount != 0
            ? res.status(202).json("Deleted Success")
            : res.status(400).json("Faild to delete the Order");
    } catch (e) {
        const errors = `Faild to delete Order with Product Id ${req.params.id}, error: ${e.message}`;
        res.status(400).json({ errors });
    }
}

module.exports.updateOrder = async (req = express.request, res = express.response) => {
    try {
        const order = await orderService.updateById(req.params.id, req.body);
        res.status(200).json({ order });
    } catch (e) {
        const errors = `faild to update Order with id ${req.params.id}, err" ${e.message}`;
        res.status(404).json({ errors });
    }
};
