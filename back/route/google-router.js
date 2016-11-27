#!/usr/bin/env node
const Rx = require('rxjs');
const Google = require('../google-api/google-api');
const express = require('express');
const router = express.Router();

const google = new Google({
  apiKey: "AIzaSyDj5Ws6SVhvpGQdczV3bktH2kQVNHJ_U80"
});

/* GOOGLE */

router.route('/nearbysearch/hotels').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {

    // Build some combination of prices.
    let pricesCombination = new Map([
      [1, '110€'],
      [2, '120€'],
      [3, '140€'],
      [4, '130€'],
      [5, '120€'],
      [6, '90€']
    ]);

    // Adds a price to all places.
    addPriceToPlaces(data.results, pricesCombination);

    response.json(data);

  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });

  // Gets all places by the given the good type.
  let placeTypes = 'lodging';
  google.nearbysearch.getPlace(placeTypes, request.query.location, {}, getPromise);
});

router.route('/nearbysearch/restaurants').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {

    // Build some combination of prices.
    let pricesCombination = new Map([
      [1, '50€'],
      [2, '40€'],
      [3, '30€'],
      [4, '35€'],
      [5, '45€'],
      [6, '25€']
    ]);

    // Adds a price to all places.
    addPriceToPlaces(data.results, pricesCombination);

    response.json(data);

  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });

  // Gets all places by the given the good type.
  let placeTypes = 'restaurant';
  google.nearbysearch.getPlace(placeTypes, request.query.location, {}, getPromise);
});

router.route('/nearbysearch/activities').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {

    // Build some combination of prices.
    let pricesCombination = new Map([
      [1, 'entre 30 et 50€'],
      [2, 'entre 25 et 35€'],
      [3, 'entre 40 et 60€'],
      [4, 'entre 35 et 50€'],
      [5, 'entre 45 et 60€'],
      [6, 'entre 25 et 40€']
    ]);

    // Adds a price to all places.
    addPriceToPlaces(data.results, pricesCombination);

    response.json(data);

  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });

  // Gets all activities by some types (Emma can't move easily).
  let placeTypes = 'casino|museum|book_store|aquarium';
  google.nearbysearch.getPlace(placeTypes, request.query.location, {}, getPromise);
});

router.route('/nearbysearch/photo').get((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.send(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });

  // Gets picture reference from HTTP request.
  let photoReference = request.query.photoReference;
  google.nearbysearch.getPhoto(photoReference, {}, getPromise);
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

  // Gets request parameters and puts them into result object.
  let origin = request.query.origin;
  let destination = request.query.destination;
  let mode = request.query.mode;
  let parameters = {origin: origin, destination: destination, mode: mode};

  google.direction.getDirection(parameters, getPromise);
});

/**
 * Allows to add a price to a places. This price is recovered from price combinations.
 * @param places places
 * @param pricesCombination price combination
 */
function addPriceToPlaces(places, pricesCombination) {

  // Adds a price to the given places.
  places.forEach(p => p.price = pricesCombination.get(getRandomInt(1, 6)))
}

/**
 * Gets a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = router;



