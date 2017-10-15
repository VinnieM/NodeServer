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
console.log('Initialised the Employee class');

router.get('/Employee/v1/getEmployeeDetails',
  function (request, response) {
    console.log('Inside the damm API');
    response.json({
      message: 'Inside the damm API'
    });
  });

module.exports = router;
