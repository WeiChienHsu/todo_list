/*
 * ensureAuthenticated: Put in all /notes/ Path
 *    if user logged in -> Return true and run next function.
 *    if user not logged in -> Block and redirect to login page.
 * 
 * forwardAuthenticated: Put in the /users/login/ Path
 *    if user logged in -> Redirect to login page
 *    if user not logged in -> Return true and run next function
*/

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view the notes page.');
    res.redirect('/users/login');
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please logout from current user.');
    res.redirect('/notes');      
  }
};