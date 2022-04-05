const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController');
const { authRequest } = require('../Middleware/authMiddleware');


router.use(authRequest)
router.get("/orders", orderController.getOrders); // done
router.get("/orders/user", orderController.getOrdersForUser); // done
router.get("/order/:id", orderController.findOrder); // done
router.post("/order", orderController.createOrder); // done
router.delete("/order/:id", orderController.deleteOrder); // done
router.put("/order/:id", orderController.updateOrder); // done

module.exports = router;

