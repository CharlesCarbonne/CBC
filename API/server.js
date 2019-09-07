const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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

app.listen(3001, () => {
    console.log("Server listening on port 3000");
})