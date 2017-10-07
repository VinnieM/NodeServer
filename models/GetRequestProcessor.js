// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');
var employee = require('./Employee.js')

  // Node_module imports
var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser');
var fileReader = require('file-system');

router.use(jsonParser.urlencoded({
  extended: true
}));
router.use(jsonParser.json());

/**
 * GET request without any parameters
 */
router.route('/:paramName')
  .get(function (request, response) {
    var paramName = request.param('paramName');
    // Checking for the length of the API
    if (paramName.length < 1) {
      response.json({
        status: false,
        message: 'Please enter a valid API'
      });
    }
    // Check if API matches from the catalog
    var url = getAPIFromCatalog(paramName, function (data) {
      url = data;
    });
    var isApiValid = checkObjectState(url);
    // Goes into the if condition it is an error
    if (!(isApiValid)) {
      response.send(isValidUrl);
    }
    var getResponse = routeToServer(url, function (data) {
      response = data
    });
    console.log('The response is '+getResponse);
    response.json({
      message: getResponse
    });
  });

function routeToServer(url, callback) {
  router.use(url, employee, funtion(req, res, next){
    next();
  });
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
