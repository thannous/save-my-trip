#!/usr/bin/env node
const Rx = require('rxjs');
const Airfrance = require('../airfrance-api/airfrance-api');
const express = require('express');
const router = express.Router();

const airfrance = new Airfrance({
  base_url: 'https://api.klm.com/travel',
  access_token_url: 'https://www.klm.com/oauthcust/oauth/token',
  authorize_url: 'https://www.klm.com/oauthcust/authorize',
  client_id: 'q685fzg2gunq28qxmyg4u5u8',
  client_secret: 'd4RA2T8deZ'
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

/* Allows to get user data by flight number */
router.route('/user').get((request, response) => {
  console.log('GET', '/api/airfrance/user');
  response.json(airfrance.user(request.query.flightNumber));
});


module.exports = router;



