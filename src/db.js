const mongoose = require('mongoose');
const URI = 'mongodb://mongo:TfPtAn9mLKmZ9EcxrQGr@containers-us-west-94.railway.app:5472'

mongoose
  .connect(URI)
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
 module.exports = mongoose;