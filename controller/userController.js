const express = require('express');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { cloudinary } = require('../utils/cloudinary');
const User = require('../models/userModel');

// * handling errors

const handleSignupErrors = err => {
	let errors = {};

	// handle email is exists in database
	if (err.code && err.code === 11000 && err.keyPattern.email === 1) {
		errors['email'] = 'this Email is Registered';
		return errors;
	}
	// handle a valid photo or not
	if (err.code && err.code === 'ENOENT') {
		errors['user_image'] = 'this photo is not valid';
		return errors;
	}
	// handle Error in User Model
	if (err.message && err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ path, message }) => {
			errors[path] = message;
		});
	}
	return errors;
};

const handleLoginErrors = err => {
	let errors = {};
	// incorrect email
	if (err.message.includes('Incorrect Email')) {
		errors['email'] = 'email is not found';
	}
	// incorrect pasword
	if (err.message.includes('Incorrect Password')) {
		errors['password'] = 'incorrect password';
	}
	return errors;
};

const handleCompareErrors = err => {
	let errors = {};
	if (err.message.includes('this is incorrect password')) {
		errors['compare'] = 'incorrect password';
	}
	return errors;
};

const createToken = user => {
	return jwt.sign({ user }, 'mohammed jarrad secret', {
		expiresIn: 3 * 24 * 60 * 60, // 3 days in seconds
	});
};

// * Main Methods

module.exports.signup = async (req = express.request, res = express.response) => {
	try {
		let user_image_path;
		let pulic_id;
		if (req.body.user_image === '/images/profile-image-default.webp') {
			user_image_path = '/images/profile-image-default.webp';
			pulic_id = '';
		} else {
			const uploadedImage = await cloudinary.uploader.upload(req.body.user_image, {
				upload_preset: 'image_user',
			});
			user_image_path = uploadedImage.url;
			pulic_id = uploadedImage.public_id;
		}
		const user = await userService.createUser({
			...req.body,
			user_image: user_image_path,
			cloudinary_id: pulic_id,
		});
		const token = createToken(await user);
		res.status(201).json({ token, user });
	} catch (err) {
		const errors = handleSignupErrors(err);
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
		const errors = handleLoginErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.logout = async (req = express.request, res = express.response) => {
	try {
		res.status(200).json({ msg: 'Log out Success' });
	} catch (e) {
		res.status(400).json({ errors: e.message });
	}
};

module.exports.getUsers = async (req = express.request, res = express.response) => {
	try {
		const users = await userService.getUsers();
		res.status(200).json({ users });
	} catch (e) {
		const errors = `Failed to get Users, err: ${e}`;
		console.log('e', e);
		res.status(400).json({ errors });
	}
};

module.exports.updateUser = async (req = express.request, res = express.response) => {
	const id = res.locals.userID;
	const body = req.body;
	const oldUser = await userService.findUser(id);
	const { cloudinary_id } = oldUser;
	let user_image_path;
	let public_id;
	let user;
	try {
		if (body.user_image !== oldUser.user_image) {
			cloudinary_id && (await cloudinary.uploader.destroy(cloudinary_id));

			if (body.user_image === '/images/profile-image-default.webp') {
				user_image_path = '/images/profile-image-default.webp';
				public_id = '';
			} else {
				const uploadedImage = await cloudinary.uploader.upload(body.user_image, {
					upload_preset: 'image_user',
				});
				user_image_path = uploadedImage.url;
				public_id = uploadedImage.public_id;
			}
			user = await userService.updateUser(id, {
				...body,
				user_image: user_image_path,
				cloudinary_id: public_id,
			});
		} else {
			user = await userService.updateUser(id, body);
		}
		const token = createToken(user);
		res.status(200).json({ token, user });
	} catch (err) {
		const errors = `Failed to update this User with id: ${id}, err: ${err}`;
		res.status(400).json({ errors });
	}
};

module.exports.deleteAccount = async (req = express.request, res = express.response) => {
	const id = res.locals.userID;
	const currentUser = await userService.findUser(id);
	const { cloudinary_id } = currentUser;

	try {
		if (cloudinary_id) {
			await cloudinary.uploader.destroy(cloudinary_id);
		}
		const result = await userService.deleteAccount(id);
		result.deletedCount !== 0
			? res.status(200).json({ msg: 'Deleted Success', result })
			: res.status(400).json({ msg: 'Deleted Failed', result });
	} catch (e) {
		const errors = `Failed to delete this User with id: ${id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.removeUser = async (req = express.request, res = express.response) => {
	const id = req.params.id;
	const user = await userService.findUser(id);
	const { cloudinary_id } = user;

	try {
		if (cloudinary_id) {
			await cloudinary.uploader.destroy(cloudinary_id);
		}
		const result = await userService.removeUser(id);
		result.deletedCount !== 0
			? res.status(200).json({ msg: 'Deleted Success', result })
			: res.status(400).json({ msg: 'Deleted Failed', result });
	} catch (e) {
		const errors = `Failed to delete this User with id: ${id}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.changePassword = async (req = express.request, res = express.response) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
		const result = await userService.changePasswordForUser(res.locals.userID, hashPassword);
		res.status(200).json({ msg: 'Password is Changed', result });
	} catch (e) {
		const errors = `Failed to Change Password to User with id: ${res.locals.userID}, err: ${e}`;
		res.status(400).json({ errors });
	}
};

module.exports.comparePassword = async (req = express.request, res = express.response) => {
	try {
		const compare = await userService.comparePassword(req.body.enterPassword, res.locals.userID);
		return res.status(200).json({ compare });
	} catch (err) {
		const errors = handleCompareErrors(err);
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
