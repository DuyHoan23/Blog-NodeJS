const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const loginController = require('./app/controllers/login.js')
const loginUserController = require('./app/controllers/loginUser.js')
const logoutController = require('./app/controllers/logout.js')
const authMiddleware = require('./app/middleware/authMiddleware')
const redirectIfAuthenticationMiddleware = require('./app/middleware/redirectIfAuthenticationMiddleware')
const expressSession = require('express-session')
const newPostController = require('./app/controllers/newPost.js')
const homeController = require('./app/controllers/home.js')
const getPostController = require('./app/controllers/getPost.js')
const storePostController = require('./app/controllers/storePost.js')
const newUserController = require('./app/controllers/newUser.js')
const storeUserController = require('./app/controllers/storeUser.js')
const fileUpload = require('express-fileupload')

mongoose.connect('mongodb://127.0.0.1/blog_posts', {})
const app = new express();
app.use(expressSession({
  resave: true, 
  saveUninitialized: true, 
  secret: 'keyboard cat', 
  cookie: { maxAge: 60000 }}));

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
})

// test middleware
const validateMiddleware = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    return res.redirect('/posts/new')
  }
  next();
}

app.use(bodyParser.json());
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(4000, () => {
    console.log('App listening on port 4000');
})

app.get('/', homeController);
app.get('/auth/logout', logoutController);

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/post/:id',getPostController);
app.get('/posts/new',authMiddleware,newPostController)
app.post('/posts/store',authMiddleware,validateMiddleware ,storePostController);
app.get('/auth/register',redirectIfAuthenticationMiddleware, newUserController);
app.post('/users/register',redirectIfAuthenticationMiddleware, storeUserController);
app.get('/auth/login',redirectIfAuthenticationMiddleware,loginController);
app.post('/users/login',redirectIfAuthenticationMiddleware, loginUserController);
app.use((req, res) => res.render('notfound'));