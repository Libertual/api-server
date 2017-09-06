
const express       = require('express');

const UserRoutes = express.Router();

// Controllers
const UserCtrl   = require('./user.controller');
// Middlewares
// const authMid       = require('../../middlewares/authMidlw');

// UserRoutes.use(authMid.isAuth);
// Routes 'account'

UserRoutes.get('/followers', UserCtrl.getFollowers);
UserRoutes.get('/friends', UserCtrl.getFriends);


module.exports = UserRoutes;
