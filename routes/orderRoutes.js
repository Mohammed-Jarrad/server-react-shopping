const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')

router.get("/orders", orderController.getOrders);
router.get("/orders/user", orderController.getOrdersForUser);
router.get("/order/:id", orderController.findOrder);
router.post("/order", orderController.createOrder);
router.delete("/order/:id", orderController.deleteOrder);
router.put("/order/:id", orderController.updateOrder);

module.exports = router;

