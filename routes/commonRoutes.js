const express = require('express')
const route = express.Router();

var authService = require('../services/auth/authService');

route.route('/getuser')
    .post(authService.getUser);

// User Registration API
route.route('/registerUser')
    .post(authService.registerUser);

module.exports = route;