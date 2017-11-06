'use strict';
//Custom imports
var constants = require('../../lib/constants.js');
var userContext = require('../DB_Schema/EmployeeSchema.js');

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
 * This is an API which return the basic details of an employee
 *
 * @param empNumber The employee number needs to be passed a GET parameter
 */
router.route('/' + constants.APIVersion + '/getEmployeeDetails' + '/:empNumber')
  .get(function (request, response) {
    var employeeNumber = request.param('empNumber');
    userContext.find({
      'empID': employeeNumber
    }, function (err, data) {
      if (err) {
        console.log('The error is ' + err);
      } else {
        var empDetails = JSON.parse(JSON.stringify(data[0]));
        response.json({
          status: true,
          Employee_Name: empDetails.empDetails.empName,
          Employee_ADID: empDetails.empDetails.empADID,
          Employee_Band: empDetails.empDetails.empBand,
          Employee_Passport_Number: empDetails.passportDetails.passportNo,
          Employee_Manager_Name: empDetails.supDetails.Name,
          Employee_Manager_ADID: empDetails.supDetails.ADID,
          Employee_Manager_Email: empDetails.supDetails.Email
        });
      }
    });
  });

/**
 * This POST API will return a JSON value.
 */
router.route('/' + constants.APIVersion + '/getEmployeeDetailsPost')
  .post(function (request, response) {
    response.json({
      status: true,
      message: 'Inside the API getEmployeeDetailsPost'
    });
  });

server.use(constants.Employee, router);
server.listen(port);
console.log('Node Server, Employee Started on ' + port);
