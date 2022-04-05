const express = require("express");
const router = express.Router();
const productController = require('../controller/productController');
const { authRequest } = require("../Middleware/authMiddleware");

router.get('/products', authRequest, productController.getProducts);
router.get('/product/:id', productController.findProduct);
router.get('/products/user', productController.getProductsForUser);
router.get('/products/:category', productController.getProductsByCategory);
router.put('/product/:id', productController.updateProduct);
router.post('/product', productController.createProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
