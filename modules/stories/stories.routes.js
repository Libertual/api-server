
const express       = require('express');

const StoriesRoutes = express.Router();

// Components
const StoriesComponent   = require('./stories.component');
// Middlewares
const authMid       = require('../../middlewares/authMidlw');

// StoriesRoutes.use(authMid.isAuth);
// Routes 'account'
StoriesRoutes.post('/new', authMid.isAuth, StoriesComponent.newStory);
StoriesRoutes.put('/destroy/:id', authMid.isAuth, StoriesComponent.destroyStory);
StoriesRoutes.get('/user_timeline/:userName', StoriesComponent.getUserTimeline);
StoriesRoutes.get('/home_timeline', authMid.isAuth, StoriesComponent.getHomeTimeline);

module.exports = StoriesRoutes;
