
const express       = require('express');

const StoriesRoutes = express.Router();

// Components
const CreateStoryComponent   = require('./stories/create-story.component');
// Middlewares
const authMid       = require('../middlewares/authMidlw');

StoriesRoutes.use(authMid.isAuth);
// Routes 'account'
StoriesRoutes.post('/new', CreateStoryComponent.newStory);

module.exports = StoriesRoutes;
