import { Schema, model } from 'mongoose'

const userSchema = Schema({
  name: String,
  email: String,
});

const User = model("User", userSchema);

export default User;
