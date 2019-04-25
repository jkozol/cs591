var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/getPic', function(req, res, next) {
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      res.send({
        url: response.data.url,
        description: response.data.explanation,
        author: response.data.copyright
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
