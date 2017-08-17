module.exports = {
  EXPIRATION_DAYS: 7,
  SERVER: "0.0.0.0",
  PORT: process.env.PORT || 3000,
  DB: process.env.MONGODB || 'mongodb://localhost:27017/api-server',
  SECRET_TOKEN: 'L4s c0$4$ lm0rtnts n* s0n k0s4s'
}
