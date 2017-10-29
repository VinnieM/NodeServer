'use strict';
// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');
var coreUtils = require('../lib/CoreUtils.js');

// Node_module imports
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
 * If an API is not passed into the GET request
 */
router.route('/')
  .get(function (request, response) {
    response.json({
      status: false,
      message: 'A valid API is required'
    });
  });

/**
 * GET request without any parameters
 */
router.route('/:paramName')
  .get(function (request, response) {
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
    coreUtils.routeToGetProcessor(completeUrl, function (data) {
      response.send(JSON.stringify(data));
    });
  });


/**
 * GET request with parameters
 */
router.route('/:paramName/:paramValue')
  .get(function (request, response) {
    var paramName = request.param('paramName');
    // Checking if the parameter is a valid parameter
    if (paramName.length <= 1) {
      return response.json({
        status: false,
        message: 'Please enter a valid API'
      });
    }
    var paramValue = request.param('paramValue');
    // Check if API matches from the catalog
    var isApiValid = false;
    var completeUrl = '';
    coreUtils.getAPIFromCatalog(paramName, function (response) {
      // A boolean value is returned.
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
    // Appending the parameter to the completeUrl
    completeUrl += '/' + paramValue;
    coreUtils.routeToGetProcessor(completeUrl, function (data) {
      response.send(JSON.stringify(data));
    });
  });

module.exports = router;
