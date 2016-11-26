#!/usr/bin/env node
const Rx = require('rxjs');
const BlaBlaCar = require('../blablacar-api/blablacar-api');
const express = require('express');
const router = express.Router();

const blablacar = new BlaBlaCar({
  key: '83222b58430f4d31a845e20878ff6d91'
});

/* AIRFRANCE */

router.route('/trips').get((request, response) => {
  console.log('GET', '/api/trips/');
  var getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  blablacar.trips(getPromise);

});


module.exports = router;



