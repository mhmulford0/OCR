var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var FormData = require('form-data');

let clientRes;

router.get('/', function (req, res, next) {
  if (req.session.apiResponse) {
    clientRes = req.session.apiResponse;
    res.render('index', { clientRes });
  } else {
    res.render('index', {});
  }
});

router.post('/', async function (req, res, next) {
  //res.cookie('parseURL', req.body.url, { expire: 360000 + Date.now() });
  let formdata = new FormData();
  formdata.append('language', 'eng');
  formdata.append('isOverlayRequired', 'false');
  formdata.append('url', req.body.url);
  formdata.append('iscreatesearchablepdf', 'false');
  formdata.append('issearchablepdfhidetextlayer', 'false');

  let requestOptions = {
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
    .catch((error) => console.log('error', error));

  if (parseResponse.IsErroredOnProcessing == false) {
    req.session.apiResponse = parseResponse.ParsedResults[0].ParsedText;
    res.redirect('/#extract');
  } else {
    req.session.apiResponse = `Error: ${parseResponse.ErrorMessage}`;
    res.redirect('/#extract');
  }
});
module.exports = router;
