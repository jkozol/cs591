var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      const url = response.data.url;
      const explanation = response.data.explanation;
      res.render('index', { title: 'Nasa Image of the Day', url: url, explanation: explanation });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
