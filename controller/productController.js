const express = require('express');
const ProductService = require('../services/productService');
const { cloudinary } = require('../utils/cloudinary');

function handleError(e) {
	let errors = {};
	if (e.message && e.message.includes('Product validation failed')) {
		Object.values(e.errors).forEach(({ path, message }) => {
			errors[path] = message;
		});
	}
	// for not valid image
	if (e.error && e.error.code === 'ENOENT') {
		errors['imageUrl'] = 'Required, please set a valid photo';
	}

	// for missing file
	if (e.message && e.message.includes('Missing required parameter - file')) {
		errors['imageUrl'] = 'Required, please set your photo';
	}

	// for exists image
	// if (e.code === 11000) {
	// 	errors.imageUrl = 'this image is exists please change it';
	// }

	return errors;
}

module.exports.getProducts = async (req = express.request, res = express.response) => {
	try {
		const products = await ProductService.getProducts();
		res.status(200).json({ products });
	} catch (e) {
		const errors = `Failed to get all Products, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.findProduct = async (req = express.request, res = express.response) => {
	try {
		const product = await ProductService.findProduct(req.params.id);
		res.status(200).json({ product });
	} catch (e) {
		const errors = `Failed to Find Product with id ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.getProductsByCategory = async (req = express.request, res = express.response) => {
	try {
		const products = await ProductService.getProductsByCategory(req.params.category);
		res.status(200).json({ products });
	} catch (e) {
		const errors = `Failed to Find Products with ${req.params.category} Category, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.updateProduct = async (req = express.request, res = express.response) => {
	try {
		const id = req.params.id;
		const body = req.body;
		const oldProduct = await ProductService.findProduct(id);
		const { cloudinary_id } = oldProduct;
		if (cloudinary_id) {
			await cloudinary.uploader.destroy(cloudinary_id);
		}
		const imageUrl = req.body.imageUrl;
		const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
			upload_preset: 'image_product',
		});
		const product = await ProductService.updateProduct(id, {
			...body,
			cloudinary_id: uploadedImage.public_id,
			imageUrl: uploadedImage.url,
		});
		res.status(200).json({ product });
	} catch (e) {
		const errors = `Failed to Update Product with id ${id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.updateProductReviews = async (req = express.request, res = express.response) => {
	try {
		const product = await ProductService.updateProductReviews(req.params.id, res.locals.userID, req.body);
		res.status(200).json({ product });
	} catch (e) {
		const errors = `Failed to Update Product Reviews with id ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.deleteReviewFromProduct = async (req = express.request, res = express.response) => {
	try {
		const product = await ProductService.deleteReviewFromProduct(req.params.id);
		res.status(200).json({ product });
	} catch (e) {
		const errors = `Failed to delete review with id ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.createProduct = async (req = express.request, res = express.response) => {
	try {
		const imageUrl = req.body.imageUrl;
		const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
			upload_preset: 'image_product',
		});
		const product = await ProductService.createProduct({
			...req.body,
			imageUrl: uploadedImage.url,
			cloudinary_id: uploadedImage.public_id,
		});

		res.status(201).json({ product });
	} catch (e) {
		const errors = handleError(e);
		res.status(400).json({ errors, error_descreption: e });
		console.log({ e });
	}
};

module.exports.deleteProduct = async (req = express.request, res = express.response) => {
	try {
		const id = req.params.id;
		const product = await ProductService.findProduct(id);
		const { cloudinary_id } = product;
		if (cloudinary_id) {
			await cloudinary.uploader.destroy(cloudinary_id);
		}
		const result = await ProductService.deleteProduct(id);
		result.deletedCount != 0
			? res.status(202).json(`Deleted Success`)
			: res.status(400).json(`Failed to delete Product with id ${id}`);
	} catch (e) {
		const errors = `Failed to Delete the Product with id: ${id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};
