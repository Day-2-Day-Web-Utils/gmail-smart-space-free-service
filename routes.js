const express = require('express');
const gmail_controllers=require('./gmail-service/controllers');
const router = express.Router();

router.get('/mail/user/:email',gmail_controllers.getUserMailSummary);

module.exports = router;
