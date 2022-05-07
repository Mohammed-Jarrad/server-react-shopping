const {authRequest} = require("../Middleware/authMiddleware");
const cartItemController = require("../controller/cartItemController");

const router = require("express").Router();

router.post("/cart", authRequest, cartItemController.addToCart);
router.get("/cart-items", authRequest, cartItemController.getCartItems);
router.post("/cart/plus/qty", authRequest, cartItemController.plusQtyItem);
router.post("/cart/minus/qty", authRequest, cartItemController.minusQtyItem);

module.exports = router;
