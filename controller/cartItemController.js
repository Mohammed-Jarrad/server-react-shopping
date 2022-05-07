const express = require("express");
const cartItemServices = require("../services/cartItemServices");

module.exports.addToCart = async (req = express.request, res = express.response) => {
	const productId = req.body.productId;
	const size = req.body.size;
	const color = req.body.color;
	try {
		const item = await cartItemServices.addToCart(res.locals.userID, productId, size, color);
		res.json({item});
	} catch (e) {
		const errors = `Faild to create cart item with id = ${productId}, err: ${e}`;
		res.status(400).json({errors});
	}
};
module.exports.getCartItems = async (req = express.request, res = express.response) => {
	try {
		const items = await cartItemServices.getCartItems();
		res.json({items});
	} catch (e) {
		const errors = `Faild to get cart Items  , err: ${e}`;
		res.status(400).json({errors});
	}
};
module.exports.plusQtyItem = async (req = express.request, res = express.response) => {
	try {
		const item = await cartItemServices.plusQtyItem(req.body.itemId);
		res.json({item});
	} catch (e) {
		const errors = `Faild to plus qunatity cart Item with id ${req.body.itemId}  , err: ${e}`;
		res.status(400).json({errors});
	}
};
module.exports.minusQtyItem = async (req = express.request, res = express.response) => {
	try {
		const item = await cartItemServices.minusQtyItem(req.body.itemId);
		res.json({item});
	} catch (e) {
		const errors = `Faild to minus qunatity cart Item with id ${req.body.itemId}  , err: ${e}`;
		res.status(400).json({errors});
	}
};
