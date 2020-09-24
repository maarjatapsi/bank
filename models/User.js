const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const randtoken = require('rand-token');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"]
  },
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true],
    dropDups: [true]
  },
  password: {
    type: String,
    required: [true, "Password Required"]
  },
  token: {
    type: String,
    default: () => randtoken.generate(32)
  }
});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator, { message: 'Username already exists!' });

module.exports = mongoose.model("Users", UserSchema);
