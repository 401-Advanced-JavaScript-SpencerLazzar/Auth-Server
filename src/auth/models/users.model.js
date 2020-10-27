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
}, { timestamps: true });



userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.statics.authenticateBasic = async function () {
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


module.exports = mongoose.model('User', userSchema);

