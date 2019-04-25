var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var controlProfile = require('../controllers/profile');
var controlAuth = require('../controllers/authentication');

var secrets = require('../../secrets');
var auth = jwt({
  secret: secrets.jwt,
  userProperty: 'payload'
});

// profile
router.get('/profile', auth, controlProfile.profileRead);
// authentication
router.post('/register', controlAuth.register);
router.post('/login', controlAuth.login);

module.exports = router;
