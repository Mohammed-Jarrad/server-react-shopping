const express = require("express");
// const Router = express.Router;
const OrderService = require("../services/orderService");
const orderService = new OrderService()


module.exports.getOrders = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.getOrders();
        res.status(200).json(result);
    } catch (e) {
        const err = `faild to get all Orders, err: ${e.message}`;
        res.status(400).json({ message: err });
    }
}

module.exports.findOrder = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.findById(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        const err = `faild to get Order with id ${req.params.id}, err" ${e.message}`;
        res.status(400).json({ message: err });
    }
}

module.exports.getOrdersForUser = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.getOrdersForUser(
            req.params.userId
        );
        res.status(200).json({ orders: result });
    } catch (e) {
        const err = `faild to get Orders for user with id ${req.params.userId}, err" ${e.message}`;
        res.status(400).json({ message: err });
    }
}

module.exports.createOrder = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.createOrder(req.body);
        res.status(201).json(result);
    } catch (e) {
        const err = `faild to create a new Order, err" ${e.message}`;
        res.status(400).json({ message: err });
    }
}

module.exports.deleteOrder = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.deleteOrder(req.params.id);
        result.deletedCount != 0
            ? res.status(202).end()
            : res.status(400).json("Faild to delete the Order");
    } catch (e) {
        let err = `Faild to delete Order with Id ${req.params.id}, error: ${e.message}`;
        res.status(400).json({ message: err });
    }
}

module.exports.updateOrder = async (req = express.request, res = express.response) => {
    try {
        const result = await orderService.updateById(
            req.params.id,
            req.body
        );
        res.status(200).json(result);
    } catch (e) {
        const err = `faild to update Order with id ${req.params.id}, err" ${e.message}`;
        res.status(404).json({ message: err });
    }
}
