
const User = require('../../models/userModel');

function getUsersList(req, res) {
  console.log('Users List');
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: 'Error, ' });
    return res.status(200).send({ users });
  });
}

module.exports = {
  getUsersList
};
