const express = require('express')
const route = express.Router();

var authService = require('../services/auth/authService');

route.route('/getuser')
    .post(authService.getUser);

module.exports = route;