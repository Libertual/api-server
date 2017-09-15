
const express       = require('express');
const multer  = require('multer');
const crypto = require('crypto');

const UploadRoutes = express.Router();

// Controllers
const UploadCtrl   = require('./upload.controller');
// Middlewares
const authMid       = require('../../middlewares/authMidlw');

UploadRoutes.use(authMid.isAuth);
const DIR = './upload';
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, DIR);
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
    });
  }
});
const upload = multer({ storage });

// const fs = require('fs');
// UploadRoutes.use(authMid.isAuth);
// Routes 'account'
UploadRoutes.post('/', upload.any(), UploadCtrl.uploadStory);


// UploadRoutes.post('/sd', type, (req, res) => {
//   // console.log(`Upload Story: ${req.file}`);
//   const tmpPath = req.file.path;
//   // console.log(tmpPath);
//
//   /** The original name of the uploaded file
//     stored in the variable "originalname". */
//   const targetPath = `./upload/files/${req.file.originalname}`;
//
//   /** A better way to copy the uploaded file. */
//   const src = fs.createReadStream(tmpPath);
//   const dest = fs.createWriteStream(targetPath);
//   src.pipe(dest);
//   src.on('end', () => {
//     res.status(200).send({ message: 'Ok' });
//   });
//   src.on('error', (err) => {
//     res.status(500).send({ message: `Error: ${err}` });
//   });
//   // console.log(req.files);
// });

module.exports = UploadRoutes;
