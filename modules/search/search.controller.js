
const User = require('../../models/userModel');
const Story = require('../stories/_models/story.model');

function getUsersList(req, res) {
  // console.log('Users List');
  User.find({ displayName: 'Pedro' })
    .exec((err, users) => {
      if (err) return res.status(500).send({ message: 'Error, ' });
      return res.status(200).send({ users });
    });
}
function search(req, res) {
  const searchTerms = req.params.search;
  // console.log(searchTerms);
  User.find({ $text: { $search: searchTerms } }, (err, users) => {
    if (err) return res.status(500).send({ message: 'Error, ' });
    // console.log(`Users: ${users}`);

    Story.find({ $text: { $search: searchTerms } }, (error, stories) => {
      if (error) return res.status(500).send({ message: `Error: ${error}` });
      return res.status(200).send({ users, stories });
    });
    return true;
  });
}

module.exports = {
  getUsersList,
  search
};
