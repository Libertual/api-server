
function uploadStory(req, res) {
  console.log(req.files);
  console.log(`Upload Story`);
  res.status(200).send({ message: 'Ok' });
}

module.exports = {
  uploadStory
};
