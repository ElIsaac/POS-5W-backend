const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/refresh-access-token', AuthController.refreshAccessToken)

module.exports=router;