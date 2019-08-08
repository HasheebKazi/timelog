// node core libraries
const path = require('path');
const fs = require('fs');
const database = path.join(__dirname, '..', 'data', 'log.txt');

// internal imports
const Day = require('../models/day');

const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const {
  validationResult
} = require('express-validator/check');


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
            data: []
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

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // const errors = validationResult(req);
    const errors = '';
    // if (!errors.isEmpty()) {
    //   return res.status(422).render('auth/login', {
    //     path: '/login',
    //     pageTitle: 'Login',
    //     // errorMessage: errors.array()[0].msg,
    //     errorMessage: "",
    //     oldInput: {
    //       email: email,
    //       password: password
    //     },
    //     // validationErrors: errors.array()
    //     validationErrors: []
    //   });
    // }
  
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/');
              });
            }
            return res.status(422).render('auth/login', {
              path: '/login',
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password.',
              oldInput: {
                email: email,
                password: password
              },
              validationErrors: []
            });
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  };