'use strict'
const express     = require('express')
// Controllers
const authCtrl = require('../controllers/authCtrl')
// Middlewares
const authMid        = require('../middlewares/authMidlw')

const authRoutes = express.Router()

authRoutes.put('/login', authCtrl.login)
authRoutes.post('/register', authCtrl.register)

module.exports = authRoutes
