const Story = require('./_models/story.model');

function newStory(req, res) {
  const story = new Story({
    story: req.body.story,
    more: req.body.more || undefined
  });
  // if (req.body.more === '') story.more = undefined;

  console.log(`New Story Route ${story}`);
  if (story.story === 'error') return res.status(500).send({
    message: 'Error: Story not saved'
  });
  story.save((err) => {
    if (err) return res.status(500).send({
      message: 'Error: Story not saved.'
    });
    return res.status(200).send({
      message: 'New Story Route created',
      story
    });
  });
  return true;
}
module.exports = {
  newStory
};
