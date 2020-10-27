const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    tyep: String,
  },
  password: {
    tyep: String,
  }
}, { timestamps: true });


userSchema.save = async function (username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  this[username] = {
    username: username,
    password: hashedPassword,
  }
}

userSchema.generateToken = function (username) {
  let token = jwt.sign({ username: username }, 'secret_string');
  return token;
}

userSchema.authenticateBasic = async function (user, pass) {
  let isValidPassword = await bcrypt.compare(pass, this[user].password);
  console.log(isValidPassword);
  if (isValidPassword) {
    return this.generateToken(user);
  } else {
    return Promise.reject('No user found');
  }
}




module.exports = mongoose.model('User', userSchema);