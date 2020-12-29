'use strict'
//Custom imports
var constants = require('../../lib/constants.js');

//Node_module imports
var mongoConnection = require('mongoose');
var Schema = mongoConnection.Schema;

// Connecting to MongoDB
mongoConnection.connect(constants.MongoDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: false
});
var mongoDb = mongoConnection.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

var employeeSchema = new Schema({
  email: String,
  employeeId: String
});

module.exports = mongoConnection.model('EmployeeDetails', employeeSchema, 'user-context-collection');