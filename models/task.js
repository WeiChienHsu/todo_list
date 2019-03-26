const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  finished: Boolean
});

TaskSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Task', TaskSchema)