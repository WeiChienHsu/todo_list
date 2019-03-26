const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  createdAt: Date,
  finished: Boolean
});

const Task = mongoose.model('Task', TaskSchema)
module.exports = {
  Task: Task
}