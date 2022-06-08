var express = require('express');
var friendRouter = express.Router();
var friendController = require('../controllers/friend.controller');

friendRouter.route('/add').post( friendController.addFriendship);
friendRouter.route('/').get( friendController.getFriendship);
friendRouter.route('/:id').get( friendController.getMyFriendship);


module.exports = friendRouter;