const express = require('express');
const { json } = require('express/lib/response');
const ProductService = require('../services/productService');
const productService = new ProductService();
const { cloudinary } = require('../utils/cloudinary');

module.exports.getProducts = async (req = express.request, res = express.response) => {
	try {
		const products = await productService.getProducts();
		res.status(200).json({ products });
	} catch (e) {
		const errors = `Failed to get all Products, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.findProduct = async (req = express.request, res = express.response) => {
	try {
		const product = await productService.findProduct(req.params.id);
		res.status(200).json({ product });
	} catch (e) {
		const errors = `Failed to Find Product with id ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.getProductsByCategory = async (req = express.request, res = express.response) => {
	try {
		const products = await productService.getProductsByCategory(req.params.category);
		res.status(200).json({ products });
	} catch (e) {
		const errors = `Failed to Find Products with ${req.params.category} Category, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.getAllCategories = async (req = express.request, res = express.response) => {
	try {
		const products = await productService.getAllCategories();
		const categories = products.map(product => product.category);
		const categoriesWithoutDuplicate = categories.filter((category, index, arr) => {
			return arr.indexOf(category) === index;
		});
		res.status(200).json({ categories: categoriesWithoutDuplicate });
	} catch (e) {
		const errors = `Faild to get All Categories For Products, error: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.updateProduct = async (req = express.request, res = express.response) => {
	try {
		const result = await productService.updateProduct(req.params.id, req.body);
		res.status(200).json(result);
	} catch (e) {
		const err = `Failed to Update Product with id ${req.params.id}, err: ${e}`;
		res.status(400).json({ message: err });
	}
};

function handleError(e) {
	let errors = {};
	if (e.message && e.message.includes('Product validation failed')) {
		Object.values(e.errors).forEach(({ path, message }) => {
			errors[path] = message;
		});
	}
	// for not valid image
	if (e.error && e.error.code === 'ENOENT') {
		errors['imageUrl'] = 'this photo not valid';
	}
	// // for exists image
	// if (e.code === 11000) {
	// 	errors.imageUrl = 'this image is exists please change it';
	// }

	return errors;
}

module.exports.createProduct = async (req = express.request, res = express.response) => {
	try {
		const imageUrl = req.body.imageUrl;
		const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
			upload_preset: 'image_product',
		});
		console.log(uploadedImage.secure_url);
		const product = await productService.createProduct({
			...req.body,
			imageUrl: uploadedImage.secure_url,
		});
		res.status(201).json({ product });
	} catch (e) {
		const errors = handleError(e);
		res.status(400).json({ errors, e });
		console.log({ e });
		// res.status(400).json({ errors: e });
	}
};

module.exports.deleteProduct = async (req = express.request, res = express.response) => {
	try {
		const result = await productService.deleteProduct(req.params.id);
		result.deletedCount != 0
			? res.status(202).json(`Deleted Success`)
			: res.status(400).json(`Failed to delete Product with id ${req.params.id}`);
	} catch (e) {
		const errors = `Failed to Delete the Product with id: ${req.params.id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};
