'use strict'

const mongoose    = require('mongoose')

const app         = require('./app')
const config      = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(config.db, (err,res) => {
  if (err) {
    console.log(`Error al conectarse a la base de datos... ${err}`)
  }
  console.log('Conexión a la base de datos estblecida')
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`API REST Corriendo en http://localhost:${config.port}`)
  })
})
