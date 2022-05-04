const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const {authRequest} = require('../Middleware/authMiddleware');

// without Auth
router.get('/products', productController.getProducts); // done
router.get('/product/:id', productController.findProduct); // done
router.get('/products/:category', productController.getProductsByCategory); // done
router.get('/categories', productController.getAllCategories); // done
router.get('/sizes-colors', productController.getSizesAndColors); // done
// with Auth
router.put('/product/:id', authRequest, productController.updateProduct);
router.post('/product', authRequest, productController.createProduct); // done
router.delete('/product/:id', authRequest, productController.deleteProduct); // done

module.exports = router;
