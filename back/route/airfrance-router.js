#!/usr/bin/env node
const Rx = require('rxjs');
const Airfrance = require('../airfrance-api/airfrance-api');
const express = require('express');
const router = express.Router();

const airfrance = new Airfrance({
  server_token: 'opkoUm_nA48pi_O6VIh-H89YXNVPoilek4d7fILD',
});

/* AIRFRANCE */

router.route('/flightstatuses').get((request, response) => {
  console.log('GET', '/api/flightstatuses/');
  var getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  airfrance.flightstatuses(getPromise);

});

router.route('/flights').get((request, response) => {
  console.log('GET', '/api/airfrance/flights/');
  var getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  airfrance.flights(getPromise);
});

/* Allows to get user data by flight number */
router.route('/user').get((request, response) => {
  console.log('GET', '/api/airfrance/user');
  response.json(airfrance.user(request.query.flightNumber));
});


module.exports = router;



