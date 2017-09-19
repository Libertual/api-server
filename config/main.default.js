module.exports = {
  EXPIRATION_DAYS: 7,
  SERVER: '0.0.0.0',
  PORT: process.env.PORT || 3000,
  DB: process.env.MONGODB || 'mongodb://192.168.1.150:27017/shop',
  SECRET_TOKEN: 'miclavedetoken'
};
