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

console.log('Inside Employee Class');

router.route('/Employee/'+constants.APIVersion+'getEmployeeDetails')
  .get(function (request, response) {
    response.json({
      message: 'Inside getEmployee API'
    });
  });

module.exports = router;
