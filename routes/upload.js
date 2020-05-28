var express = require('express');
var router = express.Router();
const app = express();

const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');
var FormData = require('form-data');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
app.use(fileUpload());

router.post('/', async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let parseFile = req.files.parseFile;

  parseFile.mv(
    `/home/mhmulford/code/OCR/public/parseimage/${parseFile.name}`,
    function (err) {
      if (err) return res.status(500).send(err);
      res.send('File uploaded!');
    }
  );

  // const buf = Buffer.from(parseFile.data, 'utf8');
  // const img64 = buf.toString('base64');
  // console.log(img64);

  // const compressedImg = await imagemin(
  //   [`public/parseimage/${parseFile.name}.{jpg,png}`],
  //   {
  //     destination: 'public/images',
  //     plugins: [
  //       imageminJpegtran(),
  //       imageminPngquant({
  //         quality: [0.3, 0.3],
  //       }),
  //     ],
  //   }
  // );
  // const compressedBuf = Buffer.from(compressedImg[0].data, 'utf8');
  // const compressedImg64 = compressedBuf.toString('base64');
  // console.log(compressedImg64);
  // console.log();

  // let formdata = new FormData();
  // formdata.append('language', 'eng');
  // formdata.append('isOverlayRequired', 'false');
  // formdata.append(
  //   'base64Image',
  //   `data:${parseFile.mimetype};base64,${compressedImg64}`
  // );
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
  // }
});
module.exports = router;
