'use strict'

const mongoose  = require('mongoose')
const Schema    = mongoose.Schema
const bcrypt    = require('bcrypt-nodejs')
const crypto    = require('crypto')

const userSchema = Schema({
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
    default: Date.now()
  },
  lastLogin: Date,
  google: String
})

userSchema.pre('save', function(next) {
  let user = this
  if(!user.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.gravatar = function (){
  if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
userSchema.methods.comparePasword = function (attemptedPassword, done) {
    bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
      done(err, isMatch);
    })
}

module.exports = mongoose.model('user', userSchema)
