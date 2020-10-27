const express = require('express');
const app = express();
const userSchema = require('./auth/models/users.model');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(
  express.json(),
  express.urlencoded({ extended: true })
)


app.post('/signup', (req, res, next) => {
  const userCreds = req.body;
  userSchema.save(userCreds.username, userCreds.password)
    .then(() => {
      const token = userSchema.generateToken(userCreds.username);
      res.send(token);
    })
    .catch(err => {
      console.log(err);
      res.status(401).send("User can't access this")
    })
});

app.post('/signin', (req, res, next) => {
  console.log(req.headers.authorization);
  const decodedString = base64.decode(req.headers.authorization.split(' ')[1]);
  let [user, pass] = decodedString.split(':');
  console.log(user, pass);
})


module.exports = app;