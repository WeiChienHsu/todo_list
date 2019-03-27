/* Test if I could insert data into the db */
const mongoose = require('mongoose')
const Task = require("./models/task")
const mock_data = require('./mock_data')

// Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/todo-project';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Failed: '))

/* Creat an Instance (Document) of Model Task */
const singleTask = new Task({
  title: "Test Task",
  finished: true
})

/* TEST: Save data */
singleTask.save()
  .then((docs) => {
    console.log("TASK saved", docs)
    // mongoose.connection.close()
}, (err) => {
  console.error(err)
});

/* TEST: Find single data by its title */
Task.findOne({id: 7}, (err, task) => {
  if(err) {
    console.error(err);
  }
  console.log(task)
})

/* TEST: Update single data by its id */
Task.findOne({id: 7}, (err, task) => {
  if(err) {
    console.err(err);
  }
  console.log(task, "find!")
  if(task) {
    task.title = "Updated TASK";
    task.save((err) => {
      console.error(err)
    })
  }
})

/* TEST: Delete single data by its title */
Task.deleteOne({id: 8}, (err, task) => {
  if(err) {
    console.error(err);
  }
  console.log(task)
})


/* TEST: Print all datas in db */
Task.find((err, tasks) => {
  if(err) {
    console.error(err);
  }
  console.log(tasks)
})
