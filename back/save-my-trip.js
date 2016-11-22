#!/usr/bin/env node
var airfranceApi = require('./airfrance-api/airfrance-api');

module.exports = function(app){
  airfranceApi(app);
}


