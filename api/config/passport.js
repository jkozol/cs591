var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('../../secrets');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
      done(null, user);
  });

  passport.deserializeUser((user, done) => {
      done(null, user);
  });

  passport.use(new GoogleStrategy({
          clientID: secrets.clientID,
          clientSecret: secrets.clientSecret,
          callbackURL: clientSecret.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
           User.findOrCreate({ googleId: profile.id }, function (err, user) {
             return done(err, user);
           });
      }
  ));
}


// passport for auth
// passport.use(new LocalStrategy({
//     usernameField: 'email'
//   },
//   (username, password, done) => {
//     User.findOne({ email: username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: 'User is invalid'
//         });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, {
//           message: 'Password is invalid'
//         });
//       }
//       // If credentials are correct return user
//       return done(null, user);
//     });
//   }
// ));
