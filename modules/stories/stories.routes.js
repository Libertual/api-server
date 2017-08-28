
const express       = require('express');

const StoriesRoutes = express.Router();

// Components
const CreateStoryComponent   = require('./create-story.component');
const StoriesComponent   = require('./stories.component');
// Middlewares
const authMid       = require('../../middlewares/authMidlw');

// StoriesRoutes.use(authMid.isAuth);
// Routes 'account'
StoriesRoutes.post('/new', StoriesComponent.newStory);
StoriesRoutes.get('/user_timeline/:user', StoriesComponent.getUserTimeline);

module.exports = StoriesRoutes;
