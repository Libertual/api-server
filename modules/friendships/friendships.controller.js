
const User = require('../../models/userModel');


function followUser(req, res) {
  console.log('Follow User');
  console.log(req.body);

  User.findByIdAndUpdate(
    { _id: req.user },
    {
      $push: { friends: req.body.userId },
      $inc: { 'counter.friends': 1 }
    },
    { new: true },
    (err, userUpdated) => {
      if (err) return res.status(500).send({ message: 'Error, ' });
      User.findByIdAndUpdate(
        { _id: req.body.userId },
        {
          $push: { followers: req.user },
          $inc: { 'counter.followers': 1 }
        },
        { new: true },
        (error, user) => {
          if (err) return res.status(500).send({ message: `Error, user ${user.displayName} can't be updated` });
          return true;
        });
      return res.status(200).send({ message: `Following user ${req.body.userId}`, user: userUpdated });
    });
}

function unFollowUser(req, res) {
  // console.log('unFollow User');
  // console.log(req.body);

  User.findByIdAndUpdate(
    { _id: req.user },
    {
      $pull: { friends: req.body.userId },
      $inc: { 'counter.friends': -1 }
    },
    { new: true },
    (err, userUpdated) => {
      if (err) return res.status(500).send({ message: `Error, ${err}` });
      User.findByIdAndUpdate(
        { _id: req.body.userId },
        {
          $pull: { followers: req.user },
          $inc: { 'counter.followers': -1 }
        },
        { new: true },
        (error, user) => {
          if (err) return res.status(500).send({ message: `Error, user ${user.displayName} can't be updated` });
        });
      return res.status(200).send({ message: `Unfollowing user ${req.body.userId}`, user: userUpdated });
    });
}

module.exports = {
  followUser,
  unFollowUser
};
