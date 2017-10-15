'use strict';
//Custom imports
var constants = require('../lib/constants.js');

//Node_module imports
var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser');

router.use(jsonParser.urlencoded({
  extended: true
}));
router.use(jsonParser.json());

// Should I use a router.route or router.get ? Since I do not have any endpoints,
// I went with the get option

// router.route('/Employee/v1/getEmployeeDetails')
//   .get(function (request, response) {
//     console.log('Inside the fucking API');
//     response.json({
//       message: 'Inside the API getEmployeeDetails'
//     });
//   });

router.get('/Employee/v1/getEmployeeDetails',
  function (request, response) {
    console.log('Inside the fucking API');
    response.json({
      message: 'Inside the damm API'
    });
  });

module.exports = router;
