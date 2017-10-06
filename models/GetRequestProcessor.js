// Custom imports
var constants = require('../lib/constants.js');
var apiCatalog = require('../lib/APICatalog.js');

// Node_module imports
var express = require ('express');
var router = express.Router();
var jsonParser = require('body-parser');
var PropertiesReader = require('properties-reader')
var fileReader = require('file-system');

router.use(jsonParser.urlencoded({extended: true}));
router.use(jsonParser.json());

// var apiCatalog = loadAPICatalog(function(data){
//   apiCatalog = data;
// });

router.route('/:paramName')
.get(function (request, response) {
    var paramName = request.param('paramName');
    // Checking for the length of the API
    if(paramName.length<1){
      response.json({status: false, message: 'Please enter a valid API'});
    }
    // Check if API matches from the catalog
    var apiPath = getAPIFromCatalog(paramName, function(data){
      apiPath = data;
    });
    //Checks if the response is an error object or a valid response
    var isApiValid = checkObjectState(apiPath);
    if(!(isApiValid)){
      response.send(apiPath);
    }
    response.json({
      status:true,
      message: 'The API path is '+apiPath
    });
});


/**
 * checkObjectState - This method checks if the passed parameter is a JSON Object or not.
 *
 * @param  {var}  val Can be any variable
 * @return {boolean}  If the parameter is a JSON Object false is returned, else true.
 */
function checkObjectState(val){
  try{
    JSON.parse(val);
  } catch(exception){
    return true;
  }
  return false;
}


/**
 * getAPIFromCatalog - This function checks the APICatalog.js for the appropriate API link.
 *
 * @param  {var}  api The API which needs to be checked.
 * @param  {type} callback
 * @return {JSON} {String} This method will return a JSON Object in case of an error. If the
 *                          API is found the path to API is returned as a String.
 */
function getAPIFromCatalog(api, callback){
  var fetchApi = apiCatalog[api];
  if(fetchApi===undefined){
    var errorObject = JSON.stringify({
      status: false,
      message: 'Unable to find API '+api
    });
    return errorObject;
  }
  return fetchApi;
}


/**
 * loadAPICatalog - Depricated function
 *
 */
function loadAPICatalog(callback){
  var returnData;
  fileReader.readFile('../NodeServer/lib/APICatalog.properties', function (error, data){
    if(error){
      returnData = JSON.stringify({
        status: false,
        message: error
      });
      console.error('Unable to load Config File '+'\n'+returnData);
      return callback(returnData);
    }
    returnData = data.toString();
    return callback(returnData);
  });
}

module.exports = router;
