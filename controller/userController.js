const express = require("express");
const UserService = require("../services/userService");
const userService = new UserService();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { cloudinary } = require("../utils/cloudinary");

const handleError = (err) => {
    let errors = {};
    // incorrect email
    if (err.message.includes("Incorrect Email")) {
        errors["email"] = "your email is not found";
    }
    // incorrect password
    if (err.message.includes("Incorrect Password")) {
        errors["password"] = "your password incorrect";
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

// ! Main Methods

module.exports.signup = async (req = express.request, res = express.response) => {
    try {
        const user_image = req.body.user_image;
        const uploadedImage = await cloudinary.uploader.upload(user_image, {
            upload_preset: "image_user",
        });
        const user = await userService.createUser({
            ...req.body,
            user_image: uploadedImage.public_id,
        });
        const token = createToken(user);
        res.status(201).json({ token, user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.login = async (req = express.request, res = express.response) => {
    try {
        const isUser = await userService.login(req.body.email, req.body.password);
        if (isUser) {
            const token = createToken(isUser);
            return res.status(200).json({ token, isUser });
        }
        res.status(200).json({ isUser });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout = async (req = express.request, res = express.response) => {
    try {
        res.status(200).json({ msg: 'Log out Seccess' })
    } catch (e) {
        res.status(400).json({ errors: e.message })
    }
}

module.exports.getUsers = async (req = express.request, res = express.response) => {
    try {
        const users = await userService.getUsres();
        res.status(200).json({ users });
    } catch (e) {
        const errors = `Failed to get Users, err: ${e}`;
        res.status(400).json({ errors });
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
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const result = await userService.changePasswordForUser(res.locals.userID, hashPassword);
        res.status(200).json({ msg: "Password is Changed", result });
    } catch (e) {
        const errors = `Failed to Change Password to User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ errors });
    }
};

module.exports.findUser = async (req = express.request, res = express.response) => {
    try {
        const user = await userService.findUser(res.locals.userID);
        res.status(200).json({ user });
    } catch (e) {
        const errors = `Failed to Find User with id: ${res.locals.userID}, err: ${e}`;
        res.status(400).json({ errors });
    }
};
