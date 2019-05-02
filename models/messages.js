// DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// create model
const messageSchema = Schema({
  title: String,
  content: String
});

const Message = mongoose.model('Message', messageSchema);


module.exports = User;
