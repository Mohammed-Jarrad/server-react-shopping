const express = require("express");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

module.exports.getProducts = async () => {
	return await Product.find();
};

module.exports.findProduct = async _id => {
	return await Product.findById(_id);
};

module.exports.getProductsByCategory = async category_name => {
	return await Product.find({ category: new RegExp(category_name, "i") });
};

module.exports.updateProduct = async (id, newProduct) => {
	return await Product.findByIdAndUpdate(id, newProduct, { new: true });
};

module.exports.createProduct = async newProduct => {
	return await Product.create(newProduct);
};

module.exports.deleteProduct = async _id => {
	await Review.deleteMany({ product: _id });
	return await Product.deleteOne({ _id });
};
