const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { authRequest } = require('../Middleware/authMiddleware');

router.get('/products', authRequest, productController.getProducts); // done
router.get('/product/:id', authRequest, productController.findProduct); // done
router.get('/products/:category', authRequest, productController.getProductsByCategory); // done
router.put('/product/:id', authRequest, productController.updateProduct);
router.post('/product', authRequest, productController.createProduct); // done
router.delete('/product/:id', authRequest, productController.deleteProduct); // done
router.get('/categories', authRequest, productController.getAllCategories); // done
router.get('/sizes', authRequest, productController.getSizes); // done

module.exports = router;
