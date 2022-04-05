const express = require("express");
const UserService = require("../services/userService");
const userService = new UserService();
const jwt = require("jsonwebtoken");

const handleError = (err) => {
    let errors = {};
    // incorrect email
    if (err.message.includes("Incorrect Email")) {
        errors["email"] = "Your Email is Not Found";
    }
    // incorrect email
    if (err.message.includes("Incorrect Password")) {
        errors["password"] = "Your Password is Not Incorrect";
    }
    // handle exists email in DB
    if (err.code === 11000) {
        errors["email"] = "this Email is Registered";
        return errors;
    }
    // handle Error in User Model
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ path, message }) => {
            errors[path] = message;
        });
    }
    return errors;
};

const createToken = (user) => {
    return jwt.sign({ user }, "mohammed jarrad secret", {
        expiresIn: 3 * 24 * 60 * 60, // 3 days
    });
};

// Main Methods

module.exports.signup = async (req = express.request, res = express.response) => {
    try {
        const user = await userService.createUser(req.body);
        const token = createToken(user);
        res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 3000 }); // 3 days
        res.status(201).json({ user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.login = async (req = express.request, res = express.response) => {
    try {
        const user = await userService.login(req.body.email, req.body.password);
        if (user) {
            const token = createToken(user);
            res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 3000 }); // 3 days
        }
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout = async (req = express.request, res = express.response) => {
    res.clearCookie('jwt')
    res.redirect('/')
}

module.exports.getUsers = async (
    req = express.request,
    res = express.response
) => {
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
        const result = await userService.updateUser(res.locals.userID, req.body);
        res.status(200).json(result);
    } catch (e) {
        const err = `Failed to update this User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
};

module.exports.deleteUser = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.deleteUser(res.locals.userID);
        // this.logout();
        result.deletedCount != 0
            ? res.status(202).send('deleted Success')
            : res.status(400).json(`Failed to delete User`);
    } catch (e) {
        const errors = `Failed to delete this User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ errors });
    }
};

module.exports.changePassword = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.changePasswordForUser(res.locals.userID, req.body.password);
        res.status(200).json(`Password is Changed`);
    } catch (e) {
        const errors = `Failed to Change Password to User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ errors });
    }
};

module.exports.findUser = async (req = express.request, res = express.response) => {
    try {
        const result = await userService.findUser(res.locals.userID);
        res.status(200).json(result);
    } catch (e) {
        const err = `Failed to Find User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ msg: err });
    }
};
