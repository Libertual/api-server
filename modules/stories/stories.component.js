
const Story = require('./_models/story.model');
const User = require('../../models/userModel');

function newStory(req, res) {
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
      console.log(`Error: ${err}`);
      return res.status(500).send({
        message: 'Error: Story not saved.'
      });
    }
    return res.status(200).send({
      message: 'New Story Route created',
      story
    });
  });
  return true;
}
function getUserTimeline(req, res) {
  // console.log(req.params.user);
  let usuario = new User();

  User.findOne({ displayName: req.params.user }, (err, user) => {
    usuario = user;
  });
  Story.find({ 'user.displayName': req.params.user }, (err, stories) => {
    res.status(200).send({ message: 'Request Acepted', stories, user: usuario });
  });
  // res.status(200).send('User Timeline');
}
module.exports = {
  newStory,
  getUserTimeline
};
