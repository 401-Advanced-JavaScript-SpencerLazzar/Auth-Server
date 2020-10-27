
const base64 = require('base-64');
const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');



module.exports = {
  bearer: async (req, res, next) => {

    if (req.headers.authorization) {

      const encodedToken = req.headers.authorization.split(' ')[1];

      // check to make sure the token is valid
      try {
        let isValidToken = await jwt.verify(encodedToken, 'SECRET_STRING');
        console.log(isValidToken);
        next();
      } catch (e) {
        next(e);
      }
    } else {
      next('Unauthorized');
    }
  },
}
