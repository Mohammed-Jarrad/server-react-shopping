const express = require('express');
const reviewService = require('../services/reviewService');

const handleCreateReviewErrors = err => {
	const errors = {};

	if ((err.name = 'ValidationError')) {
		Object.values(err.errors).map(({ path, message }) => {
			errors[path] = message;
		});
	}

	return errors;
};

module.exports.createReview = async (req = express.request, res = express.response) => {
	try {
		const review = await reviewService.createReview({ user: res.locals.userID, ...req.body });
		res.status(201).json({ review });
	} catch (e) {
		const errors = handleCreateReviewErrors(e);
		res.status(400).json({ errors });
	}
};

module.exports.getReviewsByProduct = async (req = express.request, res = express.response) => {
	try {
		const reviews = await reviewService.getReviewsByProduct(req.params.id);
		res.status(200).json({ reviews });
	} catch (e) {
		const errors = `Failed to get all Reviews for product with id: ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.deleteReview = async (req = express.request, res = express.response) => {
	try {
		const result = await reviewService.deleteReview(req.params.id);
		result.deletedCount !== 0
			? res.status(202).json({ result, msg: 'deleted Success !' })
			: res.status(400).json({ result, msg: 'deleted Failed !' });
	} catch (e) {
		const errors = `Failed to Delete Review with id: ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
		console.log(e);
	}
};

module.exports.updateReview = async (req = express.request, res = express.response) => {
	try {
		const review = await reviewService.updateReview(req.params.id, req.body);
		res.status(200).json({ review });
	} catch (e) {
		const errors = `Failed to Update Review with id: ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};
