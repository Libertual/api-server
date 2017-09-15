
const express       = require('express');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
const cors          = require('cors');


// Routes
const api           = require('./routes/index');
const authRoutes    = require('./routes/authRoutes');
const SearchRoutes    = require('./modules/search/search.routes');
const AccountRoutes = require('./routes/accountRoutes');
const StoriesRoutes = require('./modules/stories/stories.routes');
const FriendshipsRoutes = require('./modules/friendships/friendships.routes');
const UserRoutes = require('./modules/user/user.routes');
const UploadRoutes = require('./modules/upload/upload.routes');

const app = express();

app.enable('jsonp callback');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use('/api', api);
app.use('/auth', authRoutes);
app.use('/account', AccountRoutes);
app.use('/stories', StoriesRoutes);
app.use('/search', SearchRoutes);
app.use('/friendships', FriendshipsRoutes);
app.use('/:user', UserRoutes);
app.use('/upload', UploadRoutes);
app.use('/img', express.static('upload'));
module.exports = app;
