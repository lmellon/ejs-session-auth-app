const express = require('express');
const messages  = express.Router();
const Message = require('../models/users.js');

messages.post('/app/messages',(req,res) => {
  Message.create(req.body, (err, createdmessage)=>{
      res.redirect('/app');
    });
  });



module.exports = messages;
