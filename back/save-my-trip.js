#!/usr/bin/env node
var bodyParser =    require('body-parser');
var Rx = require('rxjs');

var Airfrance = require('./airfrance-api/airfrance-api');
var Uber = require('./uber-api/uber-api');



module.exports = function(app){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

  var airfrance = new Airfrance({
    client_id: '-aQnU5AFmYDO3UmVwqZtinPmN0GduypA',
    client_secret: '9hphRFJOyLn2wZm39NZlUHu5_8TFYsLgT6tQXEA9',
    server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
    redirect_uri: 'https://facebook.com',
    name: 'Save my trip',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
  });

  var uber = new Uber({
    client_id: '-aQnU5AFmYDO3UmVwqZtinPmN0GduypA',
    client_secret: '9hphRFJOyLn2wZm39NZlUHu5_8TFYsLgT6tQXEA9',
    server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
    redirect_uri: 'http://localhost:8080/api/uber/callback',
    name: 'Save my trip',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
  });

  app.get('/api/flightstatuses/', function (req, res) {
    console.log('GET','/api/flightstatuses/');
    var subject = new Rx.Subject();

    subject.subscribe(function(data){
      res.send(data);
    }, function(err){
      res.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    airfrance.flightstatuses(subject);

  });



  app.get('/api/uber/authorization', function(request, response) {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
    console.log("url",url);
    response.redirect(url);
  });

  app.get('/api/uber/callback', function(request, response) {
    uber.authorization({
      authorization_code: request.query.code
    }, function(err, access_token, refresh_token) {
      if (err) {
        console.error(err);
      } else {
        // store the user id and associated access token
        // redirect the user back to your actual app
        console.log("access_token", access_token);
        console.log("refresh_token", refresh_token);
      }
    });
  });
};



