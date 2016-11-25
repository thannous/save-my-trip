#!/usr/bin/env node
const bodyParser =    require('body-parser');
const Rx = require('rxjs');

const Airfrance = require('./airfrance-api/airfrance-api');
const Uber = require('./uber-api/uber-api');
const Recast = require('./recast-api/recast-api');
const Google = require('./google-api/google-api');
const Skyscanner =  require('./skyscanner-api/skyscanner-api');
const Citymapper = require('./citymapper-api/citymapper-api');

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

  const google = new Google({
    apiKey: "AIzaSyDj5Ws6SVhvpGQdczV3bktH2kQVNHJ_U80"
  });

  const skyscanner = new Skyscanner({
    apiKey: "ch374033574984796702425394185238"
  });

  const citymapper = new Citymapper();
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

  app.get('/api/uber/price',(request, response) => {
    console.log('api/uber/price');
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    let startlat = "48.995417";
    let startlng = "2.533997";
    let endlat = "48.975919";
    let endlng = "2.500974";
    uber.estimates.getPriceForRoute(startlat,startlng,endlat, endlng, getPromise);
  });

  app.get('/api/uber/time',(request, response) => {
    console.log('api/uber/time');
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    let startlat = "48.995417";
    let startlng = "2.533997";
    uber.estimates.getTimeForLocation(startlat,startlng,getPromise);
  });

  /* GOOGLEPLACE */

  app.get('/api/google/nearbysearch/hotel', (request, response) => {
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.json(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    google.nearbysearch.getHotel({}, getPromise);
  });


  app.get('/api/google/direction/getdirection', (request, response) => {
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.json(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    google.direction.getDirection({}, getPromise);
  });

  /* skyscanner */

  app.get('/api/skyscanner/hotels/autosuggest', (request, response) => {
    console.log('api/skyscanner/hotels/autosuggest');
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    skyscanner.hotels.autosuggest({
      market: "FR",
      currency: "EUR",
      locale: "fr-FR",
      query: "paris"
    }, getPromise);
  });

  app.get('/api/skyscanner/hotels/livePrices', (request, response) => {
    console.log('api/skyscanner/hotels/autosuggest');
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    skyscanner.hotels.livePrices.session({
      market: "FR",
      currency: "EUR",
      locale: "fr-FR",
      entityId: "48.853,2.35-latlong",
      checkindate: "2016-11-27",
      checkoutdate: "2016-11-29",
      guests: 1,
      rooms: 1
    }, getPromise);
  });

  app.get('/api/citymapper/traveltime',(request, response) => {
    console.log('api/citymapper/traveltime');
    let getPromise = new Rx.Subject();
    getPromise.subscribe(function(data){
      response.send(data);
    }, function(err){
      response.send('Error: ' + err);
    }, function(){
      console.log("COMPLETED");
    });
    citymapper.traveltime({}, getPromise);
  });


  // "48.995417, 2.533997"
};



