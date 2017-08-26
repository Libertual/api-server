'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config/main')

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(config.EXPIRATION_DAYS, 'days').unix(),
  }

  return jwt.encode(payload, config.SECRET_TOKEN, 'HS256')
}

module.exports = {
  createToken: createToken
}
