'use strict'
//Node_module imports
var express = require('express');
var router = express.Router([{
  strict: true,
  caseSensitive: true
}]);
var jsonParser = require('body-parser');

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

module.exports = router;
