'use strict';
// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');
var employee = require('./Employee.js')

// Node_module imports
var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser');
var fileReader = require('file-system');
var request = require('request');
var Promise = require('promise');

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
    if (paramName.length <= 1) {
      return response.json({
        status: false,
        message: 'Please enter a valid API'
      });
    }
    // Truds is this a right way to use callbacks?

    // Check if API matches from the catalog
    var url = getAPIFromCatalog(paramName, function (data) {
      url = data;
    });
    // If API is not found an error is returned
    var isApiValid = checkObjectState(url);
    if (!(isApiValid)) {
      response.send(url);
    }
    var getResponse = routeToServer(url);
    response.json({
      message: getResponse,
      status: 'Happy Path'
    });
  });

// Is this how promises are supposed to be used?
function routeToServer(path) {
  console.log('URL is ' + path);
  var promise = new Promise(function (resolve, reject) {
    router.use(path, employee.router);
  });
  console.log(JSON.stringify(promise));
  return promise.toString();
}

/**
 * checkObjectState - This method checks if the passed parameter is a JSON Object or not.
 *
 * @param  {var}  val Can be any variable
 * @return {boolean}  If the parameter is a JSON Object false is returned, else true.
 */
function checkObjectState(val) {
  try {
    JSON.parse(val);
  } catch (exception) {
    return true;
  }
  return false;
}

/**
 * getAPIFromCatalog - This function checks the APICatalog.js for the
 * appropriate API.
 *
 * @param  {var}  api The API which needs to be checked.
 * @param  {type} callback
 * @return {JSON} {String} This method will return a JSON Object if the API could not be found.
 * If the API is found, the path to API is returned as a String object.
 */
function getAPIFromCatalog(api, callback) {
  var fetchApi = apiCatalog[api];
  if (fetchApi === undefined) {
    var errorObject = JSON.stringify({
      status: false,
      message: 'Unable to find API ' + api
    });
    return errorObject;
  }
  return fetchApi;
}


/**
 * loadAPICatalog - Depricated function
 *
 */
function loadAPICatalog(callback) {
  var returnData;
  fileReader.readFile('../NodeServer/lib/APICatalog.properties', function (error, data) {
    if (error) {
      returnData = JSON.stringify({
        status: false,
        message: error
      });
      console.error('Unable to load Config File ' + '\n' + returnData);
      return callback(returnData);
    }
    returnData = data.toString();
    return callback(returnData);
  });
}

module.exports = router;
