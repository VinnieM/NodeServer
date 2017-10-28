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
var port = process.env.port || 9091;
var router = express.Router([{
  strict: true,
  caseSensitive: true
}]);

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
router.route('/' + constants.APIVersion + '/getEmployeeDetails')
  .get(function (request, response) {
    response.json({
      status: true,
      message: 'Inside the API getEmployeeDetails'
    });
  });


/**
 * This is a test API which takes a parameter
 */
router.route('/' + constants.APIVersion + '/getEmployeeDetails'+'/:paramValue')
  .get(function(request, response) {
    var param = request.param('paramValue');
    response.json({
      status: true,
      paramValue: param
    });
  });

server.use(constants.Employee, router);
server.listen(port);
console.log('Node Server, Employee Started on ' + port);