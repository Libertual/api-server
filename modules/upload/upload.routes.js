
const express       = require('express');
const multer  = require('multer');

const UploadRoutes = express.Router();

// Controllers
// const UploadCtrl   = require('./upload.controller');
// Middlewares
// const authMid       = require('../../middlewares/authMidlw');

const upload = multer({ dest: './upload' });
const type = upload.single('uploadFile');

const fs = require('fs');

// UploadRoutes.use(authMid.isAuth);
// Routes 'account'
UploadRoutes.post('/', type, (req, res) => {
  console.log(`Upload Story: ${req.file}`);
  const tmpPath = req.file.path;
  console.log(tmpPath);

  /** The original name of the uploaded file
    stored in the variable "originalname". */
  const targetPath = `./upload/files/${req.file.originalname}`;

  /** A better way to copy the uploaded file. */
  const src = fs.createReadStream(tmpPath);
  const dest = fs.createWriteStream(targetPath);
  src.pipe(dest);
  src.on('end', () => {
    res.status(200).send({ message: 'Ok' });
  });
  src.on('error', (err) => {
    res.status(500).send({ message: `Error: ${err}` });
  });
  // console.log(req.files);
});

module.exports = UploadRoutes;
