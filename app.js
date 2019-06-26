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

app.use((req, res, next) => {
    res.render('index');
})

app.listen(3000);