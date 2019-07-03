// external dependences: node modules
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');

// node core libraries
const path = require('path');
const fs = require('fs');

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://node_project:AkWcOzQBkbWJdXoA@summer-2019-fo8l7.mongodb.net/timelog';
console.log(MONGODB_URI);

// internal imports
// controllers
const loggerRoutes = require('./routes/logger_routes');

// initialize and configure app
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// request response cycle
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
    res.render('index');
})

app.use(loggerRoutes);

app.use((req, res, next) => {
    res.render('error');
})

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });