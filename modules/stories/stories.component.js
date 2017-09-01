
const Story = require('./_models/story.model');
const User = require('../../models/userModel');

function newStory(req, res) {
  // console.log(`Body: ${req.body}`);
  const story = new Story({
    story: req.body.story,
    more: req.body.more || undefined,
    user: req.body.user
  });
  // if (req.body.more === '') story.more = undefined;

  // console.log(`New Story Route ${story}`);
  if (story.story === 'error') return res.status(500).send({
    message: 'Error: Story not saved'
  });
  story.save((err) => {
    if (err) {
      console.error(`Error: ${err}`);
      return res.status(500).send({
        message: 'Error: Story not saved.'
      });
    }
    User.findByIdAndUpdate(req.body.user._id, { $inc: { 'counter.beats': 1 } }, { new: true }, (error, userUpdated) => {
      if (error) console.error(`Error: ${error}`);
      return userUpdated;
    });
    return true;
  });
  return res.status(200).send({
    message: 'New story saved',
    story
  });
}

function getUserTimeline(req, res) {
  // console.log(`Params: ${JSON.stringify(req.params)}`);
  let usuario = new User();

  User.find({ userName: req.params.userName }, (err, user) => {
    usuario = user;
  });
  // console.log(req.params.userName);
  Story.find({ 'user.userName': req.params.userName }, (err, stories) => {
    res.status(200).send({ message: 'Request Acepted', stories, user: usuario });
  });
  // res.status(200).send('User Timeline');
}
module.exports = {
  newStory,
  getUserTimeline
};
