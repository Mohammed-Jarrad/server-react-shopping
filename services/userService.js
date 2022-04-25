const User = require('../models/userModel');

module.exports.createUser = async userData => {
	return await User.create(userData);
};

module.exports.getUsres = async () => {
	return await User.find();
};

module.exports.findUser = async _id => {
	return await User.findById({ _id });
};

module.exports.updateUser = async (id, newInformation) => {
	return await User.findByIdAndUpdate(id, newInformation, { new: true });
};

module.exports.deleteUser = async _id => {
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
