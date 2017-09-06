
const User = require('../../models/userModel');

function getFollowers(req, res) {
  // console.log('Follow User');
  // console.log(req.baseUrl.substr(1));

  User.findOne({ userName: req.baseUrl.substr(1) })
    .populate('followers')
    .exec((err, user) => {
      console.log(user);
      if (err) return res.status(500).send({ message: `Error, ${err}` });
      return res.status(200).send({ message: 'Request accepted', user });
    });
}

function getFriends(req, res) {
  console.log('Get friends');
  console.log(req.body);

  User.findOne({ userName: req.baseUrl.substr(1) })
    .populate('friends')
    .exec((err, user) => {
      console.log(user);
      if (err) return res.status(500).send({ message: `Error, ${err}` });
      return res.status(200).send({ message: 'Request accepted', user });
    });
}

module.exports = {
  getFollowers,
  getFriends
};
