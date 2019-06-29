// external dependences: node modules
const express = require('express');
const bodyParser = require('body-parser');

// node core libraries
const path = require('path');
const fs = require('fs');

// initialize and configure app
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// request response cycle
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();


app.get('/', (req, res, next) => {
    res.render('index');
})

app.get('/logger',  (req, res, next) => {
    fs.readFile('./data/log.txt', 'utf8', (err, result) => {
        result = JSON.parse(result);
        
        if (!err) {
            res.render('logger', {
                pageTitle: 'App',
                user: {
                    name: 'Name'
                },
                currentDate: 'Someday Month Day, Year',
                data: result
            });
        } else {
            console.log(err);
        }
    })



})

app.post('/logger', jsonParser, (req, res, next) => {
    console.log(req.body.value);
    fs.writeFile('./data/log.txt', JSON.stringify(req.body.value), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('data-saved');
        }
    })

})

app.use((req, res, next) => {
    res.render('error');
})

app.listen(3000);