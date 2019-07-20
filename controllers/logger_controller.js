// node core libraries
const path = require('path');
const fs = require('fs');
const database = path.join(__dirname, '..', 'data', 'log.txt');

// internal imports
const Day = require('../models/day');


exports.getLogger = (req, res, next) => {


    // Day.create({
    //     name: "hash",
    //     log: [{
    //             time: "9:00 Am", activity: "wakeup"
    //         }]
    // });

    Day.findOne({
        name: "hash"
    }).then(result => {
        res.render('logger', {
            pageTitle: 'App',
            user: {
                name: 'Name'
            },
            currentDate: 'Someday Month Day, Year',
            data: result.log
        });
    })
    .catch(err => {
        console.log(err)
    });

    // fs.readFile(database, 'utf8', (err, result) => {
    //     result = JSON.parse(result);
    //     if (!err) {
    //         res.render('logger', {
    //             pageTitle: 'App',
    //             user: {
    //                 name: 'Name'
    //             },
    //             currentDate: 'Someday Month Day, Year',
    //             data: result
    //         });
    //     } else {
    //         console.log(__dirname);
    //         console.log('error:', err);
    //     }
    // });
};

exports.postLogger = (req, res, next) => {
    Day.findOne({
        name: "hash"
    })
    .then(result => {
        result.log = req.body.value;
        result.save();
        res.redirect('/logger')
    })
    .catch(err => {
        console.log(err)
    });
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'login',
        validationErrors: [],
        oldInput: {
            email: '',
            password: ''
        }
    });
};