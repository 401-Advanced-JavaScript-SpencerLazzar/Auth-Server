const express = require('express');
const app = express();
const cors = require('cors');
const userModel = require('./auth/models/users.model');

const router = require('./auth/router');


app.use(
  express.json(),
  express.urlencoded({ extended: true })
);

app.use(cors());

app.use(express.static('./src}'));


app.use('/', router);
app.get('/oauth', (req, res) => {
  res.status(200).send(req.token);
});





module.exports = app;