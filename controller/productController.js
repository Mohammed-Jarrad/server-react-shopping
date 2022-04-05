const express = require('express')
const Router = express.Router;
const ProductService = require('../services/productService')
const productService = new ProductService()


module.exports.getProducts = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.getProducts();
        res.status(200).json(result);
    } catch (e) {
        const errors = `Failed to get all Products, err: ${e}`;
        res.status(400).json({ errors })
    }
}

module.exports.findProduct = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.findProduct(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        const errors = `Failed to Find Product with id ${req.params.id}, err: ${e}`;
        res.status(400).json({ errors });
    }
}

// module.exports.getProductsForUser = async (req = express.request, res = express.response) => {
//     try {
//         const result = await productService.getProductsForUser(req.params.userId);
//         res.status(200).json(result);
//     } catch (e) {
//         const err = `Failed to Find Products to the User with id ${req.params.userId}, err: ${e}`;
//         res.status(400).json({ message: err });
//     }
// }

module.exports.getProductsByCategory = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.getProductsByCategory(req.params.category);
        res.status(200).json(result);
    } catch (e) {
        const errors = `Failed to Find Products to ${req.params.category} Category, err: ${e}`;
        res.status(400).json({ errors });
    }
}

module.exports.updateProduct = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(result);
    } catch (e) {
        const err = `Failed to Update Product with id ${req.params.id}, err: ${e}`;
        res.status(400).json({ message: err });
    }
}

const handleError = (e) => {
    let errors = {};

    if (e.message.includes('Product validation failed')) {
        Object.values(e.errors).forEach(({ path, message }) => {
            errors[path] = message;
        })
    }

    if (e.code === 11000) {
        errors.imageUrl = 'this Image is exists please Change it'
    }

    return errors;
}

module.exports.createProduct = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.createProduct(req.body);
        res.status(201).json(result);
    } catch (e) {
        const errors = handleError(e);
        (!Object.keys(errors).length)
            ? res.status(400).json(`Failed to Create new Product, err: ${e}`)
            : res.status(400).json({ errors });
    }
}

module.exports.deleteProduct = async (req = express.request, res = express.response) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        result.deletedCount != 0
            ? res.status(202).json(`Deleted Success`)
            : res.status(400).json(`Failed to delete Product with id ${req.params.id}`)
    } catch (e) {
        const err = `Failed to Delete the Product with id: ${req.params.id}, err: ${e}`;
        res.status(400).json({ message: err });
    }
}
