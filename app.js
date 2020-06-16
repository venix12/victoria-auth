const config = require('./config.json');
const express = require('express');
const index = require('./index');
const session = require('express-session');
const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/aiess.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aiess.tk/cert.pem')
};

const app = express();

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', index);

app.listen(8080);

https.createServer(options, app).listen(8443);
