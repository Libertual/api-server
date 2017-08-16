'use strict'

const express       = require('express')
const accountRoutes    = express.Router()

// Controllers
const accountCtrl      = require('../controllers/accountCtrl')
// Middlewares
const authMid       = require('../middlewares/authMidlw')

accountRoutes.use(authMid.isAuth);
// Routes 'account'
accountRoutes.get('/settings', accountCtrl.getSettings);

module.exports = accountRoutes