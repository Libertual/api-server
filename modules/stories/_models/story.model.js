
const moment = require('moment');
const Mongoose = require('mongoose');

const Schema  = Mongoose.Schema;

const User = require('../../../models/userModel');

const StorySchema = Schema({
  id: Number,
  story: String,
  more: String,
  composeDate: {
    type: Date,
    default: moment()
  },
  active: { type: Boolean, default: true },
  user: {
    _id: { type: Schema.ObjectId, ref: 'users' },
    displayName: String,
    userName: String
  }
});

module.exports = Mongoose.model('stories', StorySchema);
