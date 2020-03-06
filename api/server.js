const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var port = 3001

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB CONNECTION : OK");
}).catch(err => {
    console.log('DB CONNECTION: KO', err);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to CBC"});
});

require ('./app/routes/comic.routes.js') (app);

app.listen(port, () => {
    console.log("Server listening on port "+port);
})