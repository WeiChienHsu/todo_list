const todoController = require('../controllers/todoController')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports = (app, passport) => {
  /* Index Page: Ask user to login  */
  app.get('/', (req, res) => {
    /* If not authenticated */
    return res.redirect('/users/login')
  })

  /* Login Page: Ask user to login  */
  app.get('/users/login', (req, res) => {
    console.log("Auth: " + req.isAuthenticated())
    return res.render('login')
  })

  app.post('/users/login',
    passport.authenticate('local', {
      failureRedirect: '/users/login', 
      failureFlash: 'Invalid username or password.',
      successFlash: 'Welcome!'}
    ),
    (req, res) => {
      res.redirect('/notes')
    }
  )

  app.get('/users/signup', (req, res) => {
    return res.render('signup');
  })

  /* Create a new Account */
  app.post('/users/signup', (req, res) => {
    const { inputName, inputEmail, inputPassword, inputConfirmPassword } = req.body
    let errors = []
    /* Check validation */
    if(inputPassword != inputConfirmPassword) {
      errors.push({ msg: 'Password do not match.'})
    }
    
    if(errors.length > 0) {
      return res.render('signup', {errors, inputName, inputEmail, inputPassword, inputConfirmPassword})
    }
    else {
      /* Check if the user is in the DB */  
      User.findOne({email : inputEmail}).then(user => {
        if (user) {
          /* Found the user in the DB */
          errors.push({ msg : 'Email already exists.'});
          return res.render('signup', {errors, inputName, inputEmail, inputPassword, inputConfirmPassword})
        }
        else {
          /* Create a new user */
          const newUser = new User({
            name: inputName,
            email: inputEmail,
            password: inputPassword 
          });

          console.log("New User created: " + newUser)

          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in.')
                    return res.redirect('/users/login')
                  })
                  .catch(err => console.log(err));
              })
          });
        }
      })
    } 
  })

  app.get('/users/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out.')
    return res.redirect('/users/login')
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