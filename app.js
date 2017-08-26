'use strict'

const express     = require('express')
const bodyParser  = require('body-parser')
const logger      = require('morgan')
const cors        = require('cors')

// Routes
const api         = require('./routes/index')
const authRoutes  = require('./routes/authRoutes')
const accountRoutes  = require('./routes/accountRoutes')

let app = express();

app.enable("jsonp callback");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'));
app.use('/api', api);
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);

module.exports = app
