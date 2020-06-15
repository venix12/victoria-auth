const config = require('./config.json');
const cookieParser = require('cookie-parser');
const express = require('express');
const index = require('./index');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const app = express();

mongoose.connect(config.db_string);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(cookieParser());

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
}));

app.use('/', index);

app.listen(8080);