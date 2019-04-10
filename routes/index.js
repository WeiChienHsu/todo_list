const todoController = require('../controllers/todoController')

module.exports = (app) => {
  /* Index: display a list of all TASKs */
  app.get('/notes', todoController.getAllTasks);

  /* Create: Create a new TASK when the form is submitted */
  app.post('/notes', todoController.createOneNewTask);

  /* Edit	: Click Edit to Select specific TASK and direct to the edit page */
  /* @return: {"id":1,"title":"Feedfire","createdAt":"11/13/2018","finished":true} */
  app.get('/notes/:id/edit', todoController.getOneTaskByIdToEdit);

  /* Update: update the information for the selected TASK */
  app.put('/notes/:id', todoController.updateOneTaskById);

  /* Delete: delete the selected TASK */
  app.delete('/notes/:id', todoController.deleteOneTaskById);

  /* Toggle: toggle the selected TASK */
  app.patch('/notes/:id', todoController.toggleOneTaskById);
}