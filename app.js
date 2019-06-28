// external dependences: node modules
const express = require('express');
const bodyParser = require('body-parser');

// node core libraries
const path = require('path');

// initialize and configure app
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// request response cycle
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/logger',  (req, res, next) => {
    res.render('logger', {
        pageTitle: 'App',
        user: {
            name: 'Name'
        },
        currentDate: 'Someday Month Day, Year'
    });
})

app.get('/', (req, res, next) => {
    res.render('index');
})

app.use((req, res, next) => {
    res.render('error');
})

app.listen(3000);