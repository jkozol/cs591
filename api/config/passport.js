var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// passport for auth
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'User is invalid'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is invalid'
        });
      }
      // If credentials are correct return user
      return done(null, user);
    });
  }
));
