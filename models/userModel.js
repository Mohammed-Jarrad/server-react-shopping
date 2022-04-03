const mongoose = require("mongoose");
const validate = require('validator');
const isEmail = validate.default.isEmail;
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "please set a validate email"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "minimum Length password is 6 charachters"],
  },
  location: {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
});

// userSchema.virtual('full_name').get(() => `${this.name.first_name} ${this.name.last_name}`);

userSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
