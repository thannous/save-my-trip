#!/usr/bin/env node
var bodyParser =    require('body-parser');
var Rx = require('rxjs');

var Airfrance = require('./airfrance-api/airfrance-api');
var Uber = require('./uber-api/uber-api');
var Recast = require('./recast-api/recast-api');
var GooglePlace = require('./google-place-api/google-place-api');

module.exports = app => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

  const airfrance = new Airfrance({
    server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
  });

  const uber = new Uber({
    client_id: '-aQnU5AFmYDO3UmVwqZtinPmN0GduypA',
    client_secret: '9hphRFJOyLn2wZm39NZlUHu5_8TFYsLgT6tQXEA9',
    server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
    redirect_uri: 'http://localhost:8080/api/uber/callback',
    name: 'Save my trip',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true // optional, defaults to false
  });

  const recast = new Recast({
    token : '4ac2299f684147685cf9d17d77acae4e',
    language : 'fr'
  });

  const googplePlace = new GooglePlace({
    apiKey: "AIzaSyDj5Ws6SVhvpGQdczV3bktH2kQVNHJ_U80"
  })

  /* AIRFRANCE */

  app.get('/api/airfrance/flightstatuses/', (request, response) =>  {
    console.log('GET','/api/flightstatuses/');
    var getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    airfrance.flightstatuses(getPromise);

  });


  /* RECAST */
  app.post('/api/recast/textConverse', (request, response) => {
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.json(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
     recast.textConverse(request.body.text, getPromise);

  });

  /* UBER */

  app.get('/api/uber/authorization', (request, response) => {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
    response.redirect(url);
  });

  app.get('/api/uber/callback', (request, response) =>  {
    uber.authorization({
      authorization_code: request.query.code
    }, (err, access_token, refresh_token) => {
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


  /* GOOGLEPLACE */

  app.get('/api/googleplace/nearbysearch/hotel', (request, response) => {
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.json(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    googplePlace.nearbysearch.getHotel({}, getPromise);

  });


};



