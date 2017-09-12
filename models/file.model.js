const moment    = require('moment');
const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const fileSchema = Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  fieldname: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  size: {
    type: Number
  },
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  }
}, { timestamps: true });

module.exports = mongoose.model('file', fileSchema);
