var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secrets = require('../../secrets');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

// set pass using scrypt encryption
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.scryptSync(password, this.salt, 64).toString('hex');
};

// verify pass using scrypt encryption
userSchema.methods.validPassword = function(password) {
  var hash = crypto.scryptSync(password, this.salt, 64).toString('hex');
  return this.hash === hash;
};

// create a jwt so api can send data
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, secrets.jwt);
};

mongoose.model('User', userSchema);
