const { Schema, model } = require("mongoose");

const user = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});
const User = model("User", user);
module.exports = User;
