const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const mock_data = require('./mock_data')
const Task = require("./models/task")
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/todo-project';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Failed: '))

// Set up the body parser to convert requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* Index: display a list of all TASKs */
app.get('/notes', (req, res) => {
  Task.find((err, tasks) => {
    if(err) {
      res.status(500).send(err);
      return
    }
    res.render('index', { tasks: tasks })
  })
});

/* Create: Create a new TASK when the form is submitted */
app.post('/notes', (req, res) => {
  const data = req.body /* JSON Object */
  const new_title = data.title
  const new_finished = data.finished
  const new_createdAt = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  const newTask = new Task({
    title: new_title,
    createdAt: new_createdAt,
    finished: new_finished
  })

  newTask.save()
    .then((docs) => {
      console.log("Store successfully: ", docs)
    }, (err) => {
      console.error(err)
    })
  
  res.send(newTask)
});

/* Edit	: Click Edit to Select specific TASK and direct to the edit page */
/* @return: {"id":1,"title":"Feedfire","createdAt":"11/13/2018","finished":true} */
app.get('/notes/:id/edit', (req, res) => {
  const edit_id = req.params.id
  Task.findOne({id: edit_id}, (err, task) => {
    if(err) {
      console.error(err);
    }
    if(task) {
      res.send(task)
    }
    else {
      res.send("Task not found!")
    }
  })
});

/* Update: update the information for the selected TASK */
app.put('/notes/:id', (req, res) => {
  /* Update the data in the db -> using the APIs form mongosses */
  const edit_id = req.params.id
  const new_title = req.body.title
  const new_finished = req.body.finished
  Task.findOne({id: edit_id}, (err, task) => {
    if(err) {
      console.error(err);
    }
    if(task) {
      /* Update the Task */
      task.title = new_title
      task.finished = new_finished
      task.save((err) => {
        if(err) console.log(err)
      })
      console.log(`Task id: ${edit_id} has been updated.`)
      res.send(task)
    }
    else {
      res.send("Task not found!")
    }
  })
});

/* <form method="POST" action="/update?_method=PUT">
  // inputs to change the data go here
  <button type="submit">Update</button>
</form> 
*/

/* Delete: delete the selected TASK */
app.delete('/notes/:id', (req, res) => {
  const selected_id = req.params.id
  /* delete the selcted id from db */
  Task.deleteOne({id: selected_id}, (err, task) => {
    if(err) {
      console.error(err);
    }
  })
  res.send(`Task id: ${edit_id} has been updated.`) //TODO: what should've reture
});

/* Toggle: toggle the selected TASK */
app.patch('/notes/:id', (req, res) => {
  const selected_id = req.params.id
  /* toggle the finished value to the selcted id from db */
  Task.findOne({id: selected_id}, (err, task) => {
    if(err) {
      console.error(err);
    }
    if(task) {
      /* Update the status of finished */
      task.finished = !task.finished
      task.save((err) => {
        if(err) console.log(err)
      })
      console.log(`The status of task id: ${selected_id} has been updated to ${task.finished}.`)
      res.send(task)
    }
    else {
      res.send("Task not found!")
    }
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))