'use strict'

//Node_module imports
var mongoConnection = require('mongoose');
var Schema = mongoConnection.Schema;
// Connecting to MongoDB
mongoConnection.connect('mongodb://127.0.0.1:27017/');

var employeeSchema = new Schema({
  email: String,
  employeeId: String
});

module.exports = mongoConnection.model('EmployeeDetails', employeeSchema);
