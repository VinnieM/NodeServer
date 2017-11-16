'use strict';
// Custom imports
var getRequests = require('./models/GetRequestProcessor.js');
var postRequests = require('./models/PostRequestProcessor.js');
var constants = require('./lib/constants.js');
var db = require('./models/DB_Schema/users.js');

// Node_Module imports
var express = require('express');
var server = express();
var jsonParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

// API's
var employee = require('./models/API/Employee.js');
var managers = require('./models/API/Manager.js');

server.use(jsonParser.urlencoded({
  extended: true
}));
server.use(jsonParser.json());

// Setting the port
var serverPort = process.env.PORT || 8080;

var router = express.Router([{
  strict: true,
  caseSensitive: true
}]);

passport.use(new Strategy(
  function (username, password, cb) {
    db.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

// Using the router for processing GET requests
router.use('/' + constants.APIVersion + '/invokeGet', getRequests);
// Using the router for processing POST requests
router.use('/' + constants.APIVersion + '/invokePost', postRequests);

// Welcome GET request

router.get('/', passport.authenticate('basic', {
    session: false
  }),
  function (request, response) {
    response.json({
      message: 'Welcome to Node server v0.1'
    });
  });

// Welcome POST request
router.post('/', passport.authenticate('basic', {
  session: false
}), function (request, response) {
  response.json({
    message: 'Welcome to Node server v0.1'
  });
});

server.use('/APIMapper', router);
server.listen(serverPort);
console.log('Node Server API Mapper is running on ' + serverPort);
