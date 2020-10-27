const dotenv = require('dotenv').config();
const app = require('./src/server');
const mongoose = require('mongoose');
const PORT = process.env.PORT;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB Connection established"))
  .catch(err => console.log("No", err))



app.listen(PORT, () => {
  console.log('Server running on port 3000')
})