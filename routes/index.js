var express = require('express');
var router = express.Router();
var nameRouter = require('./name.route');
var friendRouter = require('./friend.route');
router.use('/name',nameRouter);
router.use('/friend',friendRouter);

module.exports = router;