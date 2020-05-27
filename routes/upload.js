const express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const app = express();

// default options

router.post('/', async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let parseFile = req.files.parseFile;

  // Use the mv() method to place the file somewhere on your server
  parseFile.mv(`/mnt/c/code/OCR/public/parseimage/${parseFile.name}`, function (
    err
  ) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });
  // let formdata = new FormData();
  // formdata.append('language', 'eng');
  // formdata.append('isOverlayRequired', 'false');
  // formdata.append('base64Image', req.body.url);
  // formdata.append('iscreatesearchablepdf', 'false');
  // formdata.append('issearchablepdfhidetextlayer', 'false');

  // let requestOptions = {
  //   headers: {
  //     apikey: process.env.API_KEY,
  //   },
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow',
  // };

  // const parseResponse = await fetch(
  //   'https://api.ocr.space/parse/image',
  //   requestOptions
  // )
  //   .then((response) => response.json())
  //   .catch((error) => console.log('error', error));

  // if (parseResponse.IsErroredOnProcessing == false) {
  //   clientRes.splice(0, 1, parseResponse.ParsedResults[0].ParsedText);
  //   res.redirect('/#extract');
  // } else {
  //   clientRes.splice(0, 1, `Error: ${parseResponse.ErrorMessage}`);
  //   res.redirect('/#extract');
  //}
});
module.exports = router;