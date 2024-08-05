const express = require('express');
const router = express.Router();
const friendsController = require('../controller/friendController');

router.get('/', friendsController.listFriends);

module.exports = router;
