const User = require('../models/user')
const bcrypt = require('bcrypt')

let userController = {
  getLoginPage: (req, res) => {
    return res.render('login')
  },
  userLogin: (req, res) => {
    return res.redirect('/notes')
  },
  getSignupPage: (req, res) => {
    return res.render('signup');
  },
  userSignup: (req, res) => {
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
  },
  userLogout: (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out.')
    return res.redirect('/users/login')
  }
}

module.exports = userController