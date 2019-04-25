var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err) => {
    var token;
    token = user.generateJwt();
    // success
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {
  // using local for now
  passport.authenticate('local', (err, user, info) => {
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }
    // If the user is found respond with token
    if(user){
      token = user.generateJwt();
      // success
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // not found status
      res.status(401).json(info);
    }
  })(req, res);
};
