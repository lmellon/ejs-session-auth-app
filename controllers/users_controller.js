// Configure the user controller
const express = require('express');
const user = express.Router();
const User = require('../models/users.js');
// creates the hash to take password and convert it into a mixed $ohfjnsaflj
const bcrypt = require('bcrypt');


user.get('/new',(req,res) => {
  res.render('users/new.ejs');
});

user.post('/', (req, res)=>{
  //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    // password was hashed before we make the user
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/')
    })
})

module.exports = user
