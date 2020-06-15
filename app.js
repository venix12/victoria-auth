const config = require('./config.json');
const express = require('express');
const index = require('./index');
const session = require('express-session');

const app = express();

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', index);

app.listen(8080);