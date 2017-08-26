
const Mongoose = require('mongoose');

const Schema  = Mongoose.Schema;

const StorySchema = Schema({
  id: Number,
  story: String,
  more: String
});

module.exports = Mongoose.model('stories', StorySchema);
