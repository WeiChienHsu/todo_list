const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const Task = require("./models/task")
const handlebarsHelpers = require('./helpers/handlebars')
const flash = require('connect-flash')
const session = require('express-session')
// const mock_data = require('./mock_data')

const app = express()
const port = 3000

// Set up the body parser to convert requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'));

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

require('./routes')(app)