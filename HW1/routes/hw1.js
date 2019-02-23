var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const response = {grade: 'A'}
  res.send(response);
});

router.post('/', function (req, res) {
  res.send(req.body)
})

module.exports = router;
