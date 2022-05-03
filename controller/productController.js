const express = require('express');
const ProductService = require('../services/productService');
const {cloudinary} = require('../utils/cloudinary');

function handleError(e) {
	let errors = {};
	if (e.message && e.message.includes('Product validation failed')) {
		Object.values(e.errors).forEach(({path, message}) => {
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
		res.status(200).json({products});
	} catch (e) {
		const errors = `Failed to get all Products, err: ${e}`;
		res.status(400).json({errors});
	}
};

module.exports.getSizesAndColors = async (req = express.request, res = express.response) => {
	try {
		const products = await ProductService.getProducts();
		let sizes = [];
		let colors = [];
		products.forEach(product => {
			Object.values(product.sizes).forEach(size => sizes.push(size));
			Object.values(product.colors).forEach(color => colors.push(color));
		});
		const sizesWithoutDuplicate = sizes.filter((size, index, arr) => {
			return arr.indexOf(size) === index;
		});
		const colorsWithoutDuplicate = colors.filter((color, index, arr) => {
			return arr.indexOf(color) === index;
		});
		res.status(200).json({sizes: sizesWithoutDuplicate, colors: colorsWithoutDuplicate});
	} catch (err) {
		const errors = `Failed to get all sizes, err: ${err}`;
		res.status(400).json({errors});
	}
};

module.exports.findProduct = async (req = express.request, res = express.response) => {
	try {
		const product = await ProductService.findProduct(req.params.id);
		res.status(200).json({product});
	} catch (e) {
		const errors = `Failed to Find Product with id ${req.params.id}, err: ${e}`;
		res.status(400).json({errors});
	}
};

module.exports.getProductsByCategory = async (req = express.request, res = express.response) => {
	try {
		const products = await ProductService.getProductsByCategory(req.params.category);
		res.status(200).json({products});
	} catch (e) {
		const errors = `Failed to Find Products with ${req.params.category} Category, err: ${e}`;
		res.status(400).json({errors});
	}
};

module.exports.getAllCategories = async (req = express.request, res = express.response) => {
	try {
		const products = await ProductService.getProducts();
		const categories = products.map(product => product.category);
		const categoriesWithoutDuplicate = categories.filter((category, index, arr) => {
			return arr.indexOf(category) === index;
		});
		res.status(200).json({categories: categoriesWithoutDuplicate});
	} catch (e) {
		const errors = `Faild to get All Categories For Products, error: ${e}`;
		res.status(400).json({errors});
	}
};

module.exports.updateProduct = async (req = express.request, res = express.response) => {
	try {
		const product = await ProductService.updateProduct(req.params.id, req.body);
		res.status(200).json({product});
	} catch (e) {
		const errors = `Failed to Update Product with id ${req.params.id}, err: ${e}`;
		res.status(400).json({errors});
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
			imageUrl: uploadedImage.secure_url,
		});
		res.status(201).json({product});
	} catch (e) {
		const errors = handleError(e);
		res.status(400).json({errors, error_descreption: e});
		console.log({e});
	}
};

module.exports.deleteProduct = async (req = express.request, res = express.response) => {
	try {
		const result = await ProductService.deleteProduct(req.params.id);
		result.deletedCount != 0
			? res.status(202).json(`Deleted Success`)
			: res.status(400).json(`Failed to delete Product with id ${req.params.id}`);
	} catch (e) {
		const errors = `Failed to Delete the Product with id: ${req.params.id}, err: ${e}`;
		res.status(400).json({errors});
	}
};
