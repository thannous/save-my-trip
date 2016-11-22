#!/usr/bin/env node
var bodyParser =    require('body-parser');
var Rx = require('rxjs');

var airfranceApi = require('./airfrance-api/airfrance-api');

module.exports = function(app){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // log for dev debbug (TODO use morgan)
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });


  app.get('/api/flightstatuses/', function (req, res) {
    console.log('/api/flightstatuses/');
    var airfrance = new airfranceApi(app);
    console.log(Rx);

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

  airfranceApi(app);
};


