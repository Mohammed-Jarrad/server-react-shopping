const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = validator.default.isEmail;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    first_name: {
      type: String,
      required: [true, "Set Your First Name"],
    },
    last_name: {
      type: String,
      required: [true, "Set Your Last Name"],
    },
  },
  email: {
    type: String,
    required: [true, "Set Your Email"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "please set a validate email"],
  },
  password: {
    type: String,
    required: [true, "Set Your Password"],
    minlength: [6, "minimum Length password is 6 charachters"],
  },
  location: {
    country: {
      type: String,
      required: [true, "Set Your Country"],
    },
    city: {
      type: String,
      required: [true, "Set Your City"],
    },
  },
  phone: {
    type: String,
    required: [true, "Set Your Phone Number"],
  },
  user_image: {
    type: String,
  }
});

// userSchema.virtual('full_name').get(() => `${this.name.first_name} ${this.name.last_name}`);

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const isUser = await this.findOne({ email: email });
  if (isUser) {
    const auth = await bcrypt.compare(password, isUser.password);
    if (auth) {
      return isUser;
    } else {
      throw Error("Incorrect Password");
    }
  } else {
    throw Error("Incorrect Email");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
