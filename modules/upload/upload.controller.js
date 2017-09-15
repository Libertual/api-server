const File = require('../../models/file.model');

function uploadStory(req, res) {
  // console.log('Upload Story');
  File.insertMany(req.files, (err, filesSaved) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    return res.status(200).send({ message: 'Upload succesfull!', filesSaved });
  });
}

module.exports = {
  uploadStory
};
