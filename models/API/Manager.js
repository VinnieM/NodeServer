'use strict';
//Custom imports
var constants = require('../../lib/constants.js');

//Node_module imports
var express = require('express');
var server = express();
var jsonParser = require('body-parser');

server.use(jsonParser.urlencoded({
  extended: true
}));
server.use(jsonParser.json());

// Setting the PORT
var port = process.env.PORT || 9092;
var router = express.Router();

/**
 * This API is for health check
 */
router.route('/' + constants.APIVersion + '/')
  .get(function (request, response) {
    response.json({
      status: true,
      message: 'Server is running'
    });
  });

/**
 * This API will return the employee details.
 */
router.route('/' + constants.APIVersion + '/getManagerDetails')
  .get(function (request, response) {
    response.json({
      status: true,
      message: 'Inside the API getManagerDetails'
    });
  });

server.use(constants.Manager, router);
server.listen(port);
console.log('Node Server, Manager has started on ' + port);
