'use strict';
//Custom imports
var constants = require('../lib/constants.js');

//Node_module imports
var express = require('express');
var server = express();
var jsonParser = require('body-parser');

server.use(jsonParser.urlencoded({
  extended: true
}));
server.use(jsonParser.json());

// Setting the PORT
var employeeServerPort = 9091;
var router = express.Router();

router.route('/'+constants.APIVersion+'/')
  .get(function (request, response){
    response.json({
      message: 'Employee Server running on Port '+employeeServerPort
    });
  });

router.get('/'+constants.APIVersion+'/')

router.get('/'+constants.APIVersion+'/getEmployeeDetails',
  function (request, response) {
    console.log('Inside the API');
    response.json({
      message: 'Inside the API'
    });
  });

server.use('/Employee', router);
server.listen(employeeServerPort);
console.log('Node Server Employee Started on ' + employeeServerPort);
