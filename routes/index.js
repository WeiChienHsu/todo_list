const todoController = require('../controllers/todoController')
const Task = require("../models/task")

module.exports = (app) => {
/* Index: display a list of all TASKs */
app.get('/notes', (req, res) => {
  Task.find((err, tasks) => {
    if(err) {
      return res.status(500).send(err);
    }
    return res.render('index', { tasks: tasks })
  })
});

/* Create: Create a new TASK when the form is submitted */
app.post('/notes', (req, res) => {
  const newTitle = req.body.titleInput /* JSON Object */
  const newCreatedAt = new Date()
  const newTask = new Task({
    title: newTitle,
    createdAt: newCreatedAt,
    finished: false
  })

  newTask.save()
    .then((docs) => {
      console.log("Store successfully.")
    }, (err) => {
      return res.send("DB error: ", err)
    })
  return res.redirect("/notes")
});

/* Edit	: Click Edit to Select specific TASK and direct to the edit page */
/* @return: {"id":1,"title":"Feedfire","createdAt":"11/13/2018","finished":true} */
app.get('/notes/:id/edit', (req, res) => {
  const editId = req.params.id
  Task.findById(editId, (err, task) => {
    if(err) {
      return res.send("DB error: ", err)
    }
    if(!task) {
      return res.send("Task not found!")
    }
    return res.render('edit', { task: task })
  })
});

/* Update: update the information for the selected TASK */
app.put('/notes/:id', (req, res) => {
  /* Update the data in the db -> using the APIs form mongosses */
  const editId = req.params.id
  const newTitle = req.body.titleInput
  const newCreatedAt = new Date()

  Task.findById(editId, (err, task) => {
    if(err) {
      return res.send("DB error: ", err)
    }
    if(!task) {
      return res.send("Task not found!")
    }
    /* Update the Task */
    task.title = newTitle
    task.createdAt = newCreatedAt
    task.save((err) => {
      if(err) console.log(err)
    })
    console.log(`Task id: ${editId} has been updated.`)
    return res.redirect("/notes")
  })
});

/* Delete: delete the selected TASK */
app.delete('/notes/:id', (req, res) => {
  const selectedId = req.params.id
  /* delete the selcted id from db */
  Task.findByIdAndDelete(selectedId, (err, task) => {
    if(err) {
      return res.send("DB error: ", err)
    }
    return res.redirect("/notes")
  })
});

/* Toggle: toggle the selected TASK */
app.patch('/notes/:id', (req, res) => {
  const selectedId = req.params.id
  /* toggle the finished value to the selcted id from db */
  Task.findById(selectedId, (err, task) => {
    if(err) {
      return res.send("DB error: ", err)
    }
    if(!task) {
      return res.send("Task not found!")
    }
    /* Update the status of finished */
    task.finished = !task.finished
    task.save((err) => {
      if(err) {
        return res.send("DB error: ", err)
      }
      console.log(`The status of task id: ${selectedId} has been updated to ${task.finished}.`)
      return res.redirect("/notes")
      })
    })
  });
}