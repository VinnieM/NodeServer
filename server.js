'use strict';
// Custom imports
var getRequests = require('./models/GetRequestProcessor.js');
var constants = require('./lib/constants.js');

// Node_Module imports
var express = require('express');
var server = express();
var jsonParser = require('body-parser');

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

// Using the router for processing GET requests
router.use('/' + constants.APIVersion + '/invokeGet', getRequests);

// Welcome GET request
router.get('/', function (request, response) {
  response.json({
    message: 'Welcome to Node server v0.1'
  });
});

// Welcome POST request
router.post('/', function (request, response) {
  response.json({
    message: 'Welcome to Node server v0.1'
  });
});

server.use('/APIMapper', router);
server.listen(serverPort);
console.log('Node Server API Mapper is running on ' + serverPort);
