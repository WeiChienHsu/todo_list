const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ 
      usernameField: 'email'
    },
    (email, password, done)) => {
      /* Match user */
      User.findOne({
        email: email
      }).then(user => {
        /* User not found */
        if(!user) {
          return done(null, fall, {message, 'The email is not registered.'});
        }

        /* Match password */
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) {
            return done(null, false, { message: err })
          }
          if(isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: 'Password incorrect' });
        });
      });
    }
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      return done(err, user);
    });
  });
}