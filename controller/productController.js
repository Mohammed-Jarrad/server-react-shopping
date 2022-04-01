import express, { Router } from 'express';
import ProductService from '../services/productService';

class ProductController {

    constructor() {
        this.productService = new ProductService();
        this.intiliazeRouter();
    }

    router = Router();

    intiliazeRouter() {
        this.router.get('/products', this.getProducts.bind(this));
        this.router.get('/product/:id', this.findProduct.bind(this));
        this.router.get('/products/user', this.getProductsForUser.bind(this));
        this.router.put('/product/:id', this.updateProduct.bind(this));
        this.router.post('/product', this.createProduct.bind(this));
        this.router.delete('/product/:id', this.deleteProduct.bind(this));
    }

    getProducts = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.getProducts();
            res.status(200).json(result);
        } catch (e) {
            const err = `Failed to get all Products, err: ${e}`;
            res.status(400).json({ message: err })
        }
    }

    findProduct = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.findProduct(req.params.id);
            res.status(200).json(result);
        } catch (e) {
            const err = `Failed to Find this Product with id ${req.params.id}, err: ${e}`;
            res.status(400).json({ message: err });
        }
    }

    getProductsForUser = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.getProductsForUser(req.params.userId);
            res.status(200).json(result);
        } catch (e) {
            const err = `Failed to Find this Products to the User with id ${req.params.userId}, err: ${e}`;
            res.status(400).json({ message: err });
        }
    }

    updateProduct = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.updateProduct(req.params.id, req.body);
            res.status(200).json(result);
        } catch (e) {
            const err = `Failed to Update this Product with id ${req.params.id}, err: ${e}`;
            res.status(400).json({ message: err });
        }
    }

    createProduct = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.createProduct(req.body);
            res.status(201).json(result);
        } catch (e) {
            const err = `Failed to Create new Product, err: ${e}`;
            res.status(400).json({ message: err });
        }
    }

    deleteProduct = async (req = express.request, res = express.response) => {
        try {
            const result = await this.productService.deleteProduct(req.params.id);
            result.deletedCount != 0 
            ? res.status(202).end()
            : res.status(400).json(`Failed to delete Product with id ${req.params.id}`)
        } catch (e) {
            const err = `Failed to Delete the Product with id: ${req.params.id}, err: ${e}`;
            res.status(400).json({ message: err });
        }
    }

}

export default ProductController;