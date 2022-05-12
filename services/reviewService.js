const Review = require('../models/reviewModel');

module.exports.createReview = async newReview => {
	return await Review.create(newReview);
};

module.exports.deleteReview = async id => {
	return await Review.deleteOne({ _id: id });
};

module.exports.updateReview = async (_id, newReview) => {
	return await Review.updateOne({ _id }, { newReview }, { new: true });
};

module.exports.getProductReviews = async product_id => {
	return await Review.find({ product: product_id }).populate('user').populate('product');
};
