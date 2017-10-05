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

var apiCatalog = loadAPICatalog(function(data){
  apiCatalog = data;
});

router.route('/:paramName')
  .get(function (request, response) {
    var apiName = request.param('paramName');

    // Checking for the length of the API
    if(apiName.length<=1){
      response.json({status: false, message: 'Please enter a valid API'});
    }
    // Happy router
    response.json({
      status:true,
      message: 'Happy Route'
    });
});

function getAPIFromCatalog(error, path, api, callBack){
  var returnObject;
  properties = PropertiesReader(path);
  if(error){
    console.log('Error Reading property file from '+path);
    returnObject = JSON.stringify({
      status: false,
      message: error
    });
    return callBack(returnObject);
  }
  returnObject = properties.get(api);
  return callBack(returnObject);
}

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
