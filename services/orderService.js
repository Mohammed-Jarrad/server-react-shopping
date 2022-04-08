const express = require("express");
const Order = require("../models/orderModel");

class OrderService {
    async getOrders() {
        return await Order.find().populate("user");
    }

    async findById(id) {
        return await Order.findById(id).populate("user");
    }

    async updateById(id, newOrder) { // {_id, FormValues}
        return await Order.findByIdAndUpdate(id, newOrder, { new: true }).populate("user");
    }

    async createOrder(newOrder) { // newOrder: {...req.body, user: res.locals.userID}
        return await Order.create(newOrder);
    }

    async deleteOrder(_id) {
        return await Order.deleteOne({ _id });
    }

    async getOrdersForUser(user) {
        return await Order.find({ user })
            .populate("user")
            .populate({
                path: "order_info",
                populate: {
                    path: "product",
                }
            });
    }
}

module.exports = OrderService;
