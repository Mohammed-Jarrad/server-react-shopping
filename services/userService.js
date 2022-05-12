const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const productService = require('./productService');

module.exports.createUser = async userData => {
	return await User.create(userData);
};

module.exports.getUsers = async () => {
	return await User.find();
};

module.exports.findUser = async _id => {
	return await User.findById(_id);
};

module.exports.updateUser = async (id, newInformation) => {
	return await User.findByIdAndUpdate(id, newInformation, { new: true });
};

module.exports.deleteAccount = async _id => {
	await Order.deleteMany({ user: _id });
	await productService.deleteReviewWhenUserDeleted(_id);
	return await User.deleteOne({ _id });
};

module.exports.removeUser = async _id => {
	await Order.deleteMany({ user: _id });
	await productService.deleteReviewWhenUserDeleted(_id);
	return await User.deleteOne({ _id });
};

module.exports.changePasswordForUser = async (id, newPassword) => {
	return await User.findByIdAndUpdate({ _id: id }, { password: newPassword }, { new: true });
};

module.exports.login = async (email, password) => {
	return await User.login(email, password);
};

module.exports.comparePassword = async (enterPassword, id) => {
	return await User.comparePassword(enterPassword, id);
};
