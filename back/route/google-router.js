#!/usr/bin/env node
const Rx = require('rxjs');
const Google = require('../google-api/google-api');
const express = require('express');
const router = express.Router();

const google = new Google({
  apiKey: "AIzaSyDj5Ws6SVhvpGQdczV3bktH2kQVNHJ_U80"
});

/* GOOGLE */

router.route('/nearbysearch/hotel').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.json(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  google.nearbysearch.getHotel({}, getPromise);
});

router.route('/direction/getdirection').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.json(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  google.direction.getDirection({}, getPromise);
});

module.exports = router;



