const express = require('express');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const orderService = require('./orderService');

module.exports.getProducts = async () => {
	return await Product.find().populate({
		path: 'reviews',
		populate: {
			path: 'user',
		},
	});
};

module.exports.findProduct = async _id => {
	return await Product.findById(_id).populate({
		path: 'reviews',
		populate: {
			path: 'user',
		},
	});
};

module.exports.getProductsByCategory = async category_name => {
	return await Product.find({ category: new RegExp(category_name, 'i') }).populate({
		path: 'reviews',
		populate: {
			path: 'user',
		},
	});
};

module.exports.updateProduct = async (id, newProduct) => {
	return await Product.findByIdAndUpdate(id, newProduct, { new: true });
};

module.exports.updateProductReviews = async (id, user, newReview) => {
	const review = { user: user, ...newReview };
	const product = await Product.findOne({ _id: id });
	return await Product.findByIdAndUpdate(id, { reviews: [...product.reviews, review] }, { new: true });
};

module.exports.deleteReviewFromProduct = async review_id => {
	return await Product.findOneAndUpdate(
		{ 'reviews._id': review_id },
		{
			$pull: { reviews: { _id: review_id } },
		},
		{ new: true },
	);
};

module.exports.deleteReviewWhenUserDeleted = async user_id => {
	return Product.updateMany(
		{ 'reviews.user': user_id },
		{ $pull: { reviews: { user: user_id } } },
		{ new: true },
	);
};

module.exports.createProduct = async newProduct => {
	return await Product.create(newProduct);
};

module.exports.deleteProduct = async _id => {
	await orderService.deleteProductsFromOrders(_id);
	await orderService.deleteAllOrdersWithoutProducts();
	return await Product.deleteOne({ _id });
};
