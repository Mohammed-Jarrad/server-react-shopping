const express = require('express');
const Product = require('../models/productModel')

class ProductService {

    async getProducts() {
        return await Product.find();
    }

    async findProduct(_id) {
        return await Product.findById({ _id });
    }

    // async getProductsForUser(id) {
    //     return await Product.find({ user_id: id });
    // }

    async getProductsByCategory(category_name) {
        return await Product.find({ category: new RegExp(category_name, "i") });
    }

    async updateProduct(id, newProduct) {
        return await Product.findByIdAndUpdate(id, newProduct, { new: true });
    }

    async createProduct(newProduct) {
        // newProduct["user"] = express.response.locals.userId;
        return await Product.create(newProduct);
    }

    async deleteProduct(_id) {
        return await Product.deleteOne({ _id });
    }

}

module.exports = ProductService;