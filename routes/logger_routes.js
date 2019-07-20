// dependencies
const express = require('express');
const bodyParser = require('body-parser');

// internal imports
const loggerController = require('../controllers/logger_controller');

// config
    // express router
    const router = express.Router();
    // parse request body for header: application/json
    const jsonParser = bodyParser.json();

router.get('/logger', loggerController.getLogger);
router.post('/logger', jsonParser, loggerController.postLogger);

// router.get('/signup', loggerController.getSignup);
// router.post('/signup', loggerController.postSignup);

router.get('/login', loggerController.getLogin);
// router.post('/login', loggerController.postLogin);


module.exports = router;