
const express       = require('express');

const SearchRoutes = express.Router();

// Controllers
const SearchCtrl   = require('./search.controller');
// Middlewares
const authMid       = require('../../middlewares/authMidlw');

SearchRoutes.use(authMid.isAuth);
// Routes 'account'
SearchRoutes.get('/users', SearchCtrl.getUsersList);


module.exports = SearchRoutes;
