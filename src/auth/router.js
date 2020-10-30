// Which auth features do we need to access from a route

const express = require('express');
const base64 = require('base-64');
const Users = require('./models/users.model');
const basicMiddleware = require('./middleware/basic');

const authMiddleware = require('./middleware/basic');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const NewUser = new Users({
    username,
    password,
  });
  NewUser.save()
    .then(async user => {
      const token = await user.generateToken();
      res.send(token);
    })
    .catch(err => {
      console.error(err);
    })
})

router.post('/signin', basicMiddleware.basic, (req, res, next) => {
  if (req.token) {
    res.send(req.token);
  } else {
    res.status(401).send('hey, give me my auth headers');
  }
});




module.exports = router;

