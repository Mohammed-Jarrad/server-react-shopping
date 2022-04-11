const express = require("express");
const Product = require("../models/productModel");

class ProductService {
    async getProducts() {
        return await Product.find();
    }

    async findProduct(_id) {
        return await Product.findById({ _id });
    }

    async getProductsByCategory(category_name) {
        return await Product.find({ category: new RegExp(category_name, "i") });
    }

    async updateProduct(id, newProduct) {
        return await Product.findByIdAndUpdate(id, newProduct, { new: true });
    }

    async createProduct(newProduct) {
        return await Product.create(newProduct);
    }

    async deleteProduct(_id) {
        return await Product.deleteOne({ _id });
    }

    async getAllCategories() {
        return await Product.find(); // we need to git Category from this output
    }
}

module.exports = ProductService;
