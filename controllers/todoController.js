const Task = require("../models/task")

let todoController = {
  getAllTasks: (req, res) => {
    Task.find((err, tasks) => {
      if(err) {
        return res.status(500).send(err);
      }
      return res.render('index', { tasks: tasks })
    })
  },
  createOneNewTask: (req, res) => {
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
  },
  getOneTaskByIdToEdit: (req, res) => {
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
  },
  updateOneTaskById: (req, res) => {
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
  },
  deleteOneTaskById: (req, res) => {
    const selectedId = req.params.id
    /* delete the selcted id from db */
    Task.findByIdAndDelete(selectedId, (err, task) => {
      if(err) {
        return res.send("DB error: ", err)
      }
      return res.redirect("/notes")
    })
  },
  toggleOneTaskById: (req, res) => {
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
      });
    });
  }
}

module.exports = todoController