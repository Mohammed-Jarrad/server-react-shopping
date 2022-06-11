const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = validator.default.isEmail;
const bcrypt = require('bcrypt');
const Order = require('./orderModel');

const userSchema = new mongoose.Schema({
	name: {
		first_name: {
			type: String,
			required: [true, 'Set Your First Name'],
		},
		last_name: {
			type: String,
			required: [true, 'Set Your Last Name'],
		},
	},
	email: {
		type: String,
		required: [true, 'Set Your Email'],
		lowercase: true,
		unique: true,
		validate: [isEmail, 'please set a validate email'],
	},
	password: {
		type: String,
		required: [true, 'Set Your Password'],
		minlength: [6, 'minimum Length password is 6 charachters'],
	},
	location: {
		country: {
			type: String,
			required: [true, 'Set Your Country'],
		},
		city: {
			type: String,
			required: [true, 'Set Your City'],
		},
	},
	phone: {
		type: String,
		required: [true, 'Set Your Phone Number'],
	},
	user_image: {
		type: String,
	},
	cloudinary_id: String,
});

// hashing password pre save
userSchema.pre('save', async function (next) {
	let salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// check if user found or not
userSchema.statics.login = async function (email, password) {
	const isUser = await this.findOne({ email });
	if (isUser) {
		const auth = await bcrypt.compare(password, isUser.password);
		if (auth) {
			return isUser;
		} else {
			throw Error('Incorrect Password');
		}
	} else {
		throw Error('Incorrect Email');
	}
};

// compare with enterPassword and original password
userSchema.statics.comparePassword = async function (enterPassword, _id) {
	const user = await User.findById({ _id });
	const auth = await bcrypt.compare(enterPassword, user.password);
	if (auth) {
		return user;
	} else {
		throw Error('this is incorrect password');
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
