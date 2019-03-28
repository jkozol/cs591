var express = require('express');
var router = express.Router();
var axios = require('axios');
/* GET home page. */

// const getPainting = (term) => {
//   axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')
//     .then(response => response.data.objectIDs[0])
//     .then(objectID =>
//       axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID)
//         .then(response => {
//           return {
//             id: response.data.objectID,
//             image: response.data.primaryImage,
//             title: response.title,
//             artistName: response.data.artistDisplayName,
//             date: response.data.objectDate,
//           };
//         })
//     )
//     .catch(error => {
//       console.log(error);
//     });
// }


router.get('/', function(req, res, next) {
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      const url = response.data.url;
      const explanation = response.data.explanation;
      res.render('index', { title: 'hello', url: url, explanation: explanation });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
