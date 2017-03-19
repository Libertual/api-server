'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const heroSchema = Schema({
  id: Number,
  name: String,
})

module.exports = mongoose.model('heroe', heroSchema)
