const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const Task = require("./models/task")
const handlebarsHelpers = require('./helpers/handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

// const mock_data = require('./mock_data')
const app = express()
const port = 3000

// Set up the body parser to convert requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash())
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up the View engine by Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: handlebarsHelpers
}))
app.set('view engine', 'handlebars')

// Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/todo-project';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Failed.')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./routes')(app, passport)