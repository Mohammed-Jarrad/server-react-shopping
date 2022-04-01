const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

class UserService {

    async getOrdersForUser(id) {
        return await orderModel.find({ user_id: id });
    }

    async getProductsForUser(id) {
        return await productModel.find({ user_id: id });
    }

    async deleteOrderForUser(userId, id) {
        return await orderModel.deleteOne(id, { user_id: userId })
    }

}

export default UserService;
