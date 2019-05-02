// use dotenv to import configs from the .env file
require('dotenv').config();

// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
// this creates sessions for the user.  when logged in, starts inside a session, when log out, deletes it.
const session = require('express-session');

// CONFIGURATION of mongoose
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI

// MIDDLEWARE
// allows us to use PUT and DELETE methods
app.use(methodOverride('_method'));
// pareses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
// configure sessions.
// secret is stored in .env
app.use(session({
  secret: process.env.SECRET,// this is in the .env file
  resave: false,
  saveUninitialized: false
}))

// DATABASE CONFIGURATION AND CONNECTION
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.once('open',() => {
  console.log('connected to mongo');
});

// LISTENER
app.listen(PORT, () => {
  console.log('auth happening on port', PORT);
});

// ROUTES
app.get('/', (req,res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});

app.get('/app', (req, res)=>{
    if(req.session.currentUser){
        res.render('app/index.ejs')
    } else {
        res.redirect('/sessions/new');
    }
})

app.get('/app/messages',(req,res) => {
  res.render('app/messages/new.ejs')
})

// USERS CONTROLLER - creates new users
const userController = require('./controllers/users_controller.js');
// this means anything that comes in with '/users' in the URL will redirect the request to the userController
app.use('/users', userController);

// SESSIONS CONTROLER - handles user sessions
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

// MESSAGES CONTROLLER
const messagesController = require('./controllers/messages_controller.js');
app.use('/messages', messagesController);
