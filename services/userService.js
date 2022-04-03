const User = require("../models/userModel");

class UserService {

  signup = async (userData) => {
    return await User.create(userData);
  };

  getUsres = async () => {
    return await User.find();
  }

  findUser = async (_id) => {
    return await User.findById({ _id });
  }

  updateUser = async (id, newInformation) => {
    return await User.findByIdAndUpdate(id, newInformation, { new: true })
  }

  deleteUser = async (_id) => {
    return await User.deleteOne({ _id });
  }

  changePasswordForUser = async (id, newPassword) => {
    return await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
  }

  login = async () => { };

}

module.exports = UserService;
