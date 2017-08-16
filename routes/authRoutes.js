'use strict'
const express       = require('express')
const authRoutes    = express.Router()

// Controllers
const authCtrl      = require('../controllers/authCtrl')
// Middlewares
const authMid       = require('../middlewares/authMidlw')

// Routes
authRoutes.put('/login', authCtrl.login)
authRoutes.post('/register', authCtrl.register)

module.exports = authRoutes
