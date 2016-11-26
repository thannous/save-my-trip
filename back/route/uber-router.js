#!/usr/bin/env node
const Rx = require('rxjs');
const Uber = require('../uber-api/uber-api');
const express = require('express');
const router = express.Router();

const uber = new Uber({
  client_id: '-aQnU5AFmYDO3UmVwqZtinPmN0GduypA',
  client_secret: '9hphRFJOyLn2wZm39NZlUHu5_8TFYsLgT6tQXEA9',
  server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
  redirect_uri: 'http://localhost:8080/api/uber/callback',
  name: 'Save my trip',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});

/* UBER */

router.route('/authorization').get((request, response) => {
  var url = uber.getAuthorizeUrl(['history', 'profile', 'request', 'places']);
  response.redirect(url);
});

router.route('/callback').get((request, response) => {
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

router.route('/price').get((request, response) => {
  console.log('api/uber/price');
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  let startlat = "48.995417";
  let startlng = "2.533997";
  let endlat = "48.975919";
  let endlng = "2.500974";
  uber.estimates.getPriceForRoute(startlat, startlng, endlat, endlng, getPromise);
});

router.route('/time').get((request, response) => {
  console.log('api/uber/time');
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  let startlat = "48.995417";
  let startlng = "2.533997";
  uber.estimates.getTimeForLocation(startlat, startlng, getPromise);
});

module.exports = router;



