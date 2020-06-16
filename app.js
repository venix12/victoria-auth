const config = require('./config.json');
const express = require('express');
const fs = require('fs');
const https = require('https');
const index = require('./index');
const session = require('express-session');

const app = express();

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', index);

const certificate = {
    key: fs.readFileSync('/etc/letsencrypt/live/aiess.tk/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/aiess.tk/cert.pem')
};

const server = https.createServer(certificate, app);

server.listen(8443);