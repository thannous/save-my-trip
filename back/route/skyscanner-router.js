#!/usr/bin/env node
const Rx = require('rxjs');
const Skyscanner = require('../skyscanner-api/skyscanner-api');
const express = require('express');
const router = express.Router();

const skyscanner = new Skyscanner({
  apiKey: "ch374033574984796702425394185238"
});

/* skyscanner */

router.route('/hotels/autosuggest').get((request, response) => {
  console.log('api/skyscanner/hotels/autosuggest');
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  skyscanner.hotels.autosuggest({
    market: "FR",
    currency: "EUR",
    locale: "fr-FR",
    query: "paris"
  }, getPromise);
});

router.route('/hotels/livePrices').get((request, response) => {
  console.log('api/skyscanner/hotels/autosuggest');
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
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

module.exports = router;



