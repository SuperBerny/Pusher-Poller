const mongoose = require('mongoose');

//Map global promises
mongoose.Promse = global.Promise;

//Mongoose Connect
mongoose.connect('mongodb://Brian:password@ds117848.mlab.com:17848/pusherpoller')
.then(function() {
  console.log('MongoDB Connected')
})
.catch (function(err) {
  console.log(err)
});