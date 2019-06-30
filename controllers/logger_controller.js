// node core libraries
const path = require('path');
const fs = require('fs');
const database = path.join(__dirname, '..', 'data', 'log.txt');


exports.getLogger = (req, res, next) => {
    fs.readFile(database, 'utf8', (err, result) => {
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
            console.log(__dirname);
            console.log('error:', err);
        }
    });
};

exports.postLogger = (req, res, next) => {
    console.log(req.body.value);
    fs.writeFile(database, JSON.stringify(req.body.value), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('data-saved');
        }
    })
};