const express = require('express');
const app = express();
const userModel = require('./auth/models/users.model');

const router = require('./auth/router');


app.use(
  express.json(),
  express.urlencoded({ extended: true })
);


app.use('/', router);
// app.use('/', secretRoutes);





module.exports = app;