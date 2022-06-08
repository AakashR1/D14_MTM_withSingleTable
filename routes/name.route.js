var express = require('express');
var nameRouter = express.Router();
var nameController = require('../controllers/name.controller');

nameRouter.route('/add').post( nameController.addName);


module.exports = nameRouter;