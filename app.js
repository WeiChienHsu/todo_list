const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const mock_data = require('./mock_data')
const Task = require("./models/task")

const bodyParser = require('body-parser')
const port = 3000

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
    console.log(tasks)
    res.send(tasks)
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
  const new_createdAt = req.body.createdAt
  const new_finished = req.body.finished

  mock_data[edit_id - 1].title = new_title
  mock_data[edit_id - 1].createdAt = new_createdAt
  mock_data[edit_id - 1].finished = new_finished
  res.send(`PUT HTTP method on notes/${req.params.id} resource.`)
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
  mock_data.forEach((item, index, object) => {
    if(item.id == selected_id) {
      object.splice(index, 1);
    }
  });
  res.send(`DELETE HTTP method on notes/${req.params.id} resource.`)
});

/* Toggle: toggle the selected TASK */
app.patch('/notes/:id', (req, res) => {
  const selected_id = req.params.id
  /* toggle the finished value to the selcted id from db */
  mock_data.forEach((item, index, object) => {
    if(item.id == selected_id) {
      item.finished = !item.finished
    }
  });
  res.send(`PATCH HTTP method on notes/${req.params.id} resource.`)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))