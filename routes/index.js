var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var FormData = require('form-data');

// ** TODO pass data back to the form

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function (req, res, next) {
  var formdata = new FormData();
  formdata.append('language', 'eng');
  formdata.append('isOverlayRequired', 'false');
  formdata.append('url', req.body.url);
  formdata.append('iscreatesearchablepdf', 'false');
  formdata.append('issearchablepdfhidetextlayer', 'false');

  var requestOptions = {
    headers: {
      apikey: process.env.API_KEY,
    },
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  const extractedText = await fetch(
    'https://api.ocr.space/parse/image',
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.ParsedResults[0].ParsedText);
    })
    .catch((error) => console.log('error', error));
});
module.exports = router;
