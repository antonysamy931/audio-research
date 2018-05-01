const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path = require('path');
const http = require('http');
const app = express();

const config = require(path.join(__dirname, '/bin/server/routes/constant/config'));

// API file for interacting with Sqlite Database
const api = require(path.join(__dirname,'bin/server/routes/api/audio.controller'));
const db = require(path.join(__dirname,'/bin/server/routes/database.init'));
const user = require(path.join(__dirname,'/bin/server/routes/api/user.controller'));
const authentication = require(path.join(__dirname, '/bin/server/routes/api/authenticate.controller'));

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());
app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
});

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);
app.use('/user',user);
app.use('/auth',authentication);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;