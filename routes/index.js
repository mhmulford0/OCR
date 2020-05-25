var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var FormData = require('form-data');

let clientRes = [];

router.get('/', function (req, res, next) {
  if (clientRes.length >= 1) {
    res.render('index', { clientRes })
  } else {
    clientRes = [];
    res.render('index', {});
  }
});

router.post('/', async function (req, res, next) {
  //res.cookie('parseURL', req.body.url, { expire: 360000 + Date.now() });
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

  const parseResponse = await fetch(
    'https://api.ocr.space/parse/image',
    requestOptions
  )
    .then((response) => response.json())
    .catch(error => console.log('error', error));

  if (parseResponse.IsErroredOnProcessing == false) {
    clientRes.splice(0, 1, parseResponse.ParsedResults[0].ParsedText);
    res.redirect('/#extract');
  }
  else {
    clientRes.splice(0, 1, `Error: ${parseResponse.ErrorMessage}`)
    res.redirect('/#extract');
  }
});
module.exports = router;