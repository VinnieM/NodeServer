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

router.route('/Employee/v1/getEmployeeDetails')
  .get(function (request, response) {
    response.json({
      message: 'Inside the API getEmployeeDetails'
    });
  });

module.exports = router;
