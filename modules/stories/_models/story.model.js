
const Mongoose = require('mongoose');

const Schema  = Mongoose.Schema;

const User = require('../../../models/userModel');

const StorySchema = Schema({
  id: Number,
  story: String,
  more: String,
  composeDate: {
    type: Date,
    select: false,
    default: Date.now()
  },
  user: {
    _id: { type: Schema.ObjectId, ref: User },
    displayName: String
  }
});

module.exports = Mongoose.model('stories', StorySchema);
