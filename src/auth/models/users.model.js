const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }
  // role: {
  //   type: String,
  //   required: true,
  //   enum: ['user', 'admin', 'editor', 'user']
  // }
}, { timestamps: true });

const capabilities = {
  admin: ['read', 'create', 'update', 'delete'],
  writer: ['read', 'create',],
  editor: ['read', 'update'],
  user: ['read']
}

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.generateToken = async function () {
  let token = await jwt.sign({
    username: this.username,
    capabilities: capabilities[this.role],
  });

  return token;
}

userSchema.statics.authenticateBasic = async function (username, password) {
  return this.findOne({ username })
    .then(async user => {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = await user.generateToken();
        return token;
      }
    });
}

userSchema.methods.generateToken = async function () {
  let token = await jwt.sign({ username: this.username }, process.env.SECRET_STRING);
  return token;
}

userSchema.methods.comparePasswords = async function (password) {
  let isValid = bcrypt.compare(password, this.password);
  if (isValid) {
    return this;
  }
  return isValid;
}



module.exports = mongoose.model('User', userSchema);

