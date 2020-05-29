var express = require('express');
var router = express.Router();
const app = express();

const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

var FormData = require('form-data');

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
    }
  );

  const compressedImg = await imagemin(
    [`/home/mhmulford/code/OCR/public/parseimage/${parseFile.name}`],
    {
      destination: '/home/mhmulford/code/OCR/public/images',
      plugins: [
        imageminMozjpeg({ quality: 45 }),
        imageminPngquant({ speed: 11, quality: [0.2, 0.3] }),
      ],
    }
  );
  const compressedBuf = Buffer.from(compressedImg[0].data, 'utf8');
  const compressedImg64 = compressedBuf.toString('base64');

  let formdata = new FormData();
  formdata.append('language', 'eng');
  formdata.append('isOverlayRequired', 'false');
  formdata.append(
    'base64Image',
    `data:${parseFile.mimetype};base64,${compressedImg64}`
  );
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
    clientRes.splice(0, 1, parseResponse.ParsedResults[0].ParsedText);
    res.redirect('/#extract');
  } else {
    clientRes.splice(0, 1, `Error: ${parseResponse.ErrorMessage}`);
    res.redirect('/#extract');
  }
});
module.exports = router;
