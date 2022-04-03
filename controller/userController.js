const express = require("express");
const UserService = require("../services/userService");
const userService = new UserService();

const handleError = (e) => {
    let errors = {};
    // if error or pass not required as well
    if (e.message.includes('User validation failed')) {
        Object.values(e.errors).forEach(({ path, message }) => {
            errors[path] = message;
        })
    }
    // handle exists email in DB 
    if (e.code === 11000) {
        errors.email = 'this Email is Registered'
    }
    if (errors.password === '') errors.password = 'Validate Password';
    return errors;
}

module.exports.signup = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.signup(req.body);
        res.status(201).json(result);
    } catch (e) {
        const err = handleError(e);
        (!err)
            ? res.status(400).json(`Failed to Create User`)
            : res.status(400).json(err);
    }
};

module.exports.getUsers = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.getUsres();
        res.status(200).json(result);
    } catch (e) {
        const err = `Failed to get Users, err: ${e}`;
        res.status(400).json({ msg: err });
    }
};

module.exports.updateUser = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (e) {
        const err = `Failed to update this User with id: ${req.params.id}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
};
module.exports.deleteUser = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        result.deletedCount != 0
            ? res.status(202).end()
            : res.status(400).json(`Failed to delete User`);
    } catch (e) {
        const err = `Failed to delete this User with id: ${req.params.id}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
};

module.exports.changePassword = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.changePasswordForUser(req.params.id, req.body.password);
        res.status(200).json(`Password is Changed`)
    } catch (e) {
        const err = `Failed to Change Password to User with id: ${req.params.id}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
}

module.exports.findUser = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.findUser(req.params.id);
        res.status(200).json(result)
    } catch (e) {
        const err = `Failed to Find User with id: ${req.params.id}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
}
