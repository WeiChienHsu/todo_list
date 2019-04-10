const todoController = require('../controllers/todoController')

module.exports = (app) => {
  /* Index Page: Ask user to login  */
  app.get('/', (req, res) => {
    /* If not authenticated */
    return res.redirect('/users/login')
  })

  /* Login Page: Ask user to login  */
  app.get('/users/login', (req, res) => {
    return res.render('login')
  })

  app.post('/users/login', (req, res) => {
    // Used passport to authenticate the user input
    // Success -> redirect to /notes
    // Failure -> Redirect to login
    console.log(req.body)
    return res.send("Login data received")
  })

  app.get('/users/signup', (req, res) => {
    return res.render('signup');
  })


  /* Create a new Account */
  app.post('/users/signup', (req, res) => {
    /* Check validation */

    /* Check if the user is in the DB */

    /* Create a new user */

    /* Success -> Redirect to login */
    console.log(req.body)
    return res.send("Sign data received")
  })

  app.get('users/logout', (req, res) => {
    // req.logout()
    /* Redirect to login page */
    return res.send("This is login Page")
  })

  /* Note Index: display a list of all TASKs */
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