const moment    = require('moment');
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt-nodejs');
const crypto    = require('crypto');

const Schema    = mongoose.Schema;

const userSchema = Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  displayName: String,
  avatar: String,
  password: {
    type: String,
    select: false,
    required: true
  },
  signupDate: {
    type: Date,
    select: false,
    default: moment()
  },
  lastLogin: Date,
  externalIds: {
    google: String,
    facebook: String
  },
  counter: {
    beats: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    friends: { type: Number, default: 0 }
  },
  active: { type: Boolean, default: true },
  friends: [{ type: Schema.ObjectId, ref: 'user' }],
  followers: [{ type: Schema.ObjectId, ref: 'user' }]
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(err);
      user.password = hash;
      next();
      return true;
    });
  });
  return true;
});

userSchema.methods.gravatar = function () {
  // console.log(`Gravatar de ${this.email}`);
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

userSchema.methods.comparePasword = function (attemptedPassword, done) {
  bcrypt.compare(attemptedPassword, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
