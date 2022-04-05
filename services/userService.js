const User = require("../models/userModel");

class UserService {
  createUser = async (userData) => {
    return await User.create(userData);
  };

  getUsres = async () => {
    return await User.find();
  };

  findUser = async (_id) => {
    return await User.findById({ _id });
  };

  updateUser = async (id, newInformation) => {
    return await User.findByIdAndUpdate(id, newInformation, { new: true });
  };

  deleteUser = async (_id) => {
    return await User.deleteOne({ _id });
  };

  changePasswordForUser = async (id, newPassword) => {
    return await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
  };

  login = async (email, password) => {
    return await User.login(email, password);
  };

}

module.exports = UserService;
