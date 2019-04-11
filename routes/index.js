const todoController = require('../controllers/todoController')
const userController = require('../controllers/userController')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

module.exports = (app, passport) => {
  /* Index Page: Ask user to login  */
  app.get('/', ensureAuthenticated, (req, res) => {
    /* If authenticated */
    return res.redirect('/notes')
  })

  /* Login Page: Ask user to login  */
  app.get('/users/login', forwardAuthenticated, userController.getLoginPage)

  app.post('/users/login', forwardAuthenticated,
    passport.authenticate('local', {
      failureRedirect: '/users/login', 
      failureFlash: 'Invalid username or password.',
      successFlash: 'Welcome!'}
    ),
    userController.userLogin
  )

  app.get('/users/signup', forwardAuthenticated, userController.getSignupPage)

  /* Create a new Account */
  app.post('/users/signup', forwardAuthenticated, userController.userSignup)

  app.get('/users/logout', userController.userLogout)

  /* Note Index: display a list of all TASKs */
  app.get('/notes', ensureAuthenticated, todoController.getAllTasks);

  /* Create: Create a new TASK when the form is submitted */
  app.post('/notes', ensureAuthenticated, todoController.createOneNewTask);

  /* Edit	: Click Edit to Select specific TASK and direct to the edit page */
  /* @return: {"id":1,"title":"Feedfire","createdAt":"11/13/2018","finished":true} */
  app.get('/notes/:id/edit', ensureAuthenticated, todoController.getOneTaskByIdToEdit);

  /* Update: update the information for the selected TASK */
  app.put('/notes/:id', todoController.updateOneTaskById);

  /* Delete: delete the selected TASK */
  app.delete('/notes/:id', todoController.deleteOneTaskById);

  /* Toggle: toggle the selected TASK */
  app.patch('/notes/:id', todoController.toggleOneTaskById);
}