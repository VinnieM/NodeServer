'use strict'
// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');
var coreUtils = require('../lib/CoreUtils.js');

//Node_module imports
var express = require('express');
var router = express.Router([{
  strict: true,
  caseSensitive: true
}]);
var jsonParser = require('body-parser');
var request = require('request');

router.use(jsonParser.urlencoded({
  extended: true
}));
router.use(jsonParser.json());

/**
 * If an API is not passed into the POST request
 */
router.route('/')
  .post(function (request, response) {
    response.json({
      status: false,
      message: 'A valid API is required'
    });
  });

router.route('/:paramName')
  .post(function (request, response) {
    var paramName = request.param('paramName');
    // Checking if the parameter is a valid parameter
    if (paramName.length <= 1) {
      return response.json({
        status: false,
        message: 'Please enter a valid API'
      });
    }
    // Check if API matches from the catalog
    var isApiValid = false;
    var completeUrl = '';
    coreUtils.getAPIFromCatalog(paramName, function (response) {
      isApiValid = coreUtils.checkObjectState(response);
      completeUrl = response;
    });
    if (!(isApiValid)) {
      // If the variable url is undefined, forming a JSON response.
      if (completeUrl === undefined) {
        response.json({
          status: false,
          message: 'An error occured, Unable to find API'
        });
      }
      response.send(completeUrl);
    }
    coreUtils.routeToPostProcessor(completeUrl, function (data) {
      response.send(JSON.stringify(data));
    });
  });

module.exports = router;
