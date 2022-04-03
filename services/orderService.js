const Order = require("../models/orderModel");

class OrderService {

    async getOrders() {
        return await Order.find();
    }

    async findById(id) {
        return await Order.findById(id);
    }

    async updateById(id, newOrder) {
        return await Order.findByIdAndUpdate(id, newOrder, { new: true });
    }

    async createOrder(newOrder) {
        return await Order.create(newOrder);
    }

    async deleteOrder(_id) {
        return await Order.deleteOne({ _id });
    }

    async getOrdersForUser(_id) {
        return await Order.find({ user_id: _id });
    }

}

module.exports = OrderService;