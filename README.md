Introduction
------------

The one and only aim of this project is to learn NodeJs and Express. This is a NOdeJs version of a Java server which was created in one of my earlier projects. The end goal is to make a skeletal Restful service which can be deployed in an environment which would be highly resource and process intensive.

In a nutshell this is a Restful server which is built on NodeJS and Express. The external facing server, which in this case is server.js, which is the starting point; server.js runs on port 8080. The path to access API's are
  http://127.0.0.1:8080/APIMapper/vi/invokeGet/{APIName}
  http://127.0.0.1:8080/APIMapper/vi/invokeGet/{APIName}/{Paramaters}
  http://127.0.0.1:8080/APIMapper/vi/invokePost/{APIName}
  http://127.0.0.1:8080/APIMapper/vi/invokeDelete/{APIName}

Currently the model consist of GetRequestProcessor and PostRequestProcessor (PutRequestProcessor will be added in due course of time). According to the type of request which would be fired (GET, POST or PUT) the server.js would route the request to Get, Post or Put RequestProcessor. Once the request reaches any of the processors, the API name is compared to a list of API's which are present inside the APICatalog which is present inside the lib folder.

If a match is obtained, the new API path is obtained and then a request is made the corresponding server.

Requirements and Installation
-----------------------------
* NodeJs
* NPM
* PostMan (Not a necessity, but it has a better GUI. Curl can also be used to test API's)
