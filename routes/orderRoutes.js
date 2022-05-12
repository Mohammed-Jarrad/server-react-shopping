const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { authRequest } = require('../Middleware/authMiddleware');

// router.use(authRequest)
router.get('/orders', authRequest, orderController.getOrders); // done
router.get('/orders/user', authRequest, orderController.getOrdersForUser); // done
router.get('/order/:id', authRequest, orderController.findOrder); // done
router.post('/order', authRequest, orderController.createOrder); // done
router.delete('/order/:id', authRequest, orderController.deleteOrder); // done
router.put('/order/:id', authRequest, orderController.updateOrder); // done
router.put('/order/remove-product/:id', authRequest, orderController.deleteProductFromOrder); //  done
router.post('/orders/user/status', authRequest, orderController.getOrdersForUserByStatus); //  done
router.post('/orders/status', authRequest, orderController.getAllOrdersByStatus); //  done

module.exports = router;
