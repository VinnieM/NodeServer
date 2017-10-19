'use strict';
// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');

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
    // Check if API matches from the catalog
    var isApiValid = false;
    var completeUrl = '';
    getAPIFromCatalog(paramName, function (response) {
      isApiValid = checkObjectState(response);
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
    //TODO : Need to get the returnData and send the data as the response
    routeToServer(completeUrl);
  });

function routeToServer(completeUrl) {
  request(completeUrl, {
    json: true
  }, (error, res, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(body));
    }
  });
}

/**
 * checkObjectState - This method checks if the passed parameter is a JSON Object or not.
 *
 * @param  {var}  val Can be any variable
 * @return {boolean}  If the parameter is a JSON Object false is returned, else true.
 */
function checkObjectState(val) {
  if (val === undefined) {
    return false;
  }
  try {
    JSON.parse(val);
    return false;
  } catch (exception) {
    return true;
  }
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
  var apiFromCatalog = apiCatalog[api];
  if (apiFromCatalog === undefined) {
    var error = JSON.stringify({
      status: false,
      message: 'Unable to find API ' + api
    });
    callback(error);
  }
  callback(apiFromCatalog);
}


/**
 * loadAPICatalog - This function reads data from a file, currently a depricated
 * function
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
      callback(returnData);
    }
    returnData = data.toString();
    callback(returnData);
  });
}

module.exports = router;
