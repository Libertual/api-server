'use strict'

const mongoose    = require('mongoose')

const app         = require('./app')
const config      = require('./config')

mongoose.Promise = require('bluebird');
mongoose.connect(config.DB, (err,res) => {
  if (err) {
    console.log(`Error al conectarse a la base de datos... ${err}`)
  }
  console.log('Conexión a la base de datos estblecida')
  app.listen(config.PORT, config.SERVER, () => {
    console.log(`API REST Corriendo en http://localhost:${config.PORT}`)
  })
})
