// Which auth features do we need to access from a route

const express = require('express');
const base64 = require('base-64');
const Users = require('./models/users.model');

const authMiddleware = require('./middleware/basic');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  // expecting username and password to come from our req.body
  const username = req.body.username;
  const password = req.body.password;

  // create a user and encrypt the password
  const NewUser = new Users({
    username,
    password,
  });
  //  We need to encrypt that password 
  NewUser.save()
    .then(async user => {
      // Create a token using some user data and send it back
      const token = await user.generateToken();
      res.send(token);
    })
})


router.post('/signin', (req, res, next) => {
  // Basic =huyasdf7334bsf
  const encodedString = req.headers.authorization.split(' ')[1]; // =huyasdf7334bsf
  const decodedString = base64.decode(encodedString); // username:password

  const [user, pass] = decodedString.split(':'); // [username, password]
  // find a user that has that username
  Users.findOne({ username: user })
    .then(async user => {
      let validUser = await user.comparePasswords(pass);
      if (validUser) {
        let token = await user.generateToken();
        res.send(token);
      }
    });

});

router.get('/oauth', async (req, res, next) => {
  let code = req.query.code; // oauth gives us a code to make a request for the token

  let tokenURL = 'https://github.com/login/oauth/access_token';
  let remoteUserURL = 'https://api.github.com/user';

  try {

    // STEP#3 first exchange an access code for an access token
    const access_token = await exchangeCodeForToken(code);

    // STEP#4 Now that we have the toke, we can use this to get data about the user
    const userData = await getRemoteUserData(access_token);

    // STEP#5 Using our userData from the AUth Provider, we can create our own User to relate any resources this user creates
    //  the goal here is to send back a token from this user we created.
    const token = await createAPIUser(userData);

    res.send(token);
  } catch (e) {
    console.log(e);

    res.status(400).send("Something went wrong");
  }
});



module.exports = router;

