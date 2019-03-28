var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/hw3', function(req, res, next) {
  res.send(axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      const url = response.data.url;
      const explanation = response.data.explanation;
      console.log(url);
    })
    .catch(error => {
      console.log(error);
    }));
});

module.exports = router;
