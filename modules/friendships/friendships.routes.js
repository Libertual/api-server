
const express       = require('express');

const FriendshipsRoutes = express.Router();

// Controllers
const FriendshipsCtrl   = require('./friendships.controller');
// Middlewares
const authMid       = require('../../middlewares/authMidlw');

FriendshipsRoutes.use(authMid.isAuth);
// Routes 'account'
FriendshipsRoutes.post('/follow', FriendshipsCtrl.followUser);
FriendshipsRoutes.post('/unfollow', FriendshipsCtrl.unFollowUser);


module.exports = FriendshipsRoutes;
