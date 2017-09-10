
const moment = require('moment');

const Story = require('./_models/story.model');
const User = require('../../models/userModel');

function newStory(req, res) {
  // console.log(`Body: ${req.body}`);
  const story = new Story({
    story: req.body.story,
    more: req.body.more || undefined,
    user: req.body.user,
    composeDate: moment()
  });
  // if (req.body.more === '') story.more = undefined;

  // console.log(`New Story Route ${story}`);
  if (story.story === 'error') return res.status(500).send({
    message: 'Error: Story not saved'
  });
  // console.log(story);
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

function destroyStory(req, res) {
  // console.log(`Body: ${req.body}`);
  Story.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true },
    (error, storyUpdated) => {
      if (error) res.status(200).send({ message: `Error: ${error}` });
      User.findByIdAndUpdate(storyUpdated.user._id, { $inc: { 'counter.beats': -1 } }, { new: true }, (err, userUpdated) => {
        if (err) console.error(`Error: ${err}`);
        return userUpdated;
      });
      return res.status(200).send({
        message: 'Story deleted',
        storyUpdated
      });
    });
}

function getUserTimeline(req, res) {
  // console.log(`Params: ${JSON.stringify(req.params)}`);
  let usuario = new User();

  User.find({ userName: req.params.userName, active: true }, (err, user) => {
    usuario = user;
  });
  // console.log(req.params.userName);
  Story.find({ 'user.userName': req.params.userName, active: true }, (err, stories) => {
    res.status(200).send({ message: 'Request Acepted', stories, user: usuario });
  }).sort({ composeDate: -1 });
  // res.status(200).send('User Timeline');
}

function getHomeTimeline(req, res) {
  // console.log(`Params: ${JSON.stringify(req.params)}`);
  // console.log(`User logged: ${req.user}`);

  User.findOne({ _id: req.user }, { friends: true, _id: false }, (error, user) => {
    // console.log(user.friends);
    user.friends.push(req.user);
    if (error) res.status(500).send({ message: `Error: ${error}` });
    Story.find({ 'user._id': { $in: user.friends }, active: true })
      .populate('users')
      .sort({ composeDate: -1 })
      .exec((err, stories) => {
        // console.log(`Stories: ${stories}`);
        res.status(200).send({ message: 'Request Acepted', stories });
      });
    // console.log(`Stories: ${this.allStories}`);
  });
}
module.exports = {
  newStory,
  getUserTimeline,
  getHomeTimeline,
  destroyStory
};
