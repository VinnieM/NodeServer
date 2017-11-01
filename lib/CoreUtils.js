'use strict'
// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');

//Node_module imports
var request = require('request');

/**
 * This function will route the request to the appropriate API with GET requests
 *
 * @param completeUrl This is the URL of the Internal Server which
 * needs to be queried.
 */
var routeToGetProcessor = function (completeUrl, callback) {
  request(completeUrl, {
    json: true
  }, (error, res, body) => {
    if (error) {
      callback(error);
    } else {
      callback(body);
    }
  });
}

/**
 * This function will route the request to the appropriate API with POST request
 *
 * @param completeUrl This is the URL of the Internal Server which
 * needs to be queried.
 */
 var routeToPostProcessor = function (completeUrl, payload, callback) {
   request.post({
     headers: {'content-type':'application/json'},
     url: completeUrl,
     body: payload
   }, (error, request, body) => {
     if (error) {
       callback(error);
     } else {
       callback(body);
     }
   });
 }

/**
 * checkObjectState - This method checks if the passed parameter is a JSON Object or not.
 *
 * @param  {var}  val Can be any variable
 * @return {boolean}  If the parameter is a JSON Object false is returned, else true.
 */
var checkObjectState = function (val) {
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
var getAPIFromCatalog = function (api, callback) {
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
 * readFile - This function reads data from a file.
 *
 * @param filePath The path of the file which needs to be read.
 * @param callback The callback function
 * @return Returns the contents of the file, in case of an error
 * a JSON object is returned with an error message.
 */
var readFile = function (filePath, callback) {
  var returnData;
  fileReader.readFile(filePath, function (error, data) {
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

// Exporting the methods
module.exports.getAPIFromCatalog = getAPIFromCatalog;
module.exports.checkObjectState = checkObjectState;
module.exports.routeToGetProcessor = routeToGetProcessor;
module.exports.routeToPostProcessor = routeToPostProcessor;
module.exports.readFile = readFile;
