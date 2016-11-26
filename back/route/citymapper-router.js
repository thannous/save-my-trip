#!/usr/bin/env node
const Rx = require('rxjs');
const Citymapper = require('../citymapper-api/citymapper-api');
const express = require('express');
const router = express.Router();

const citymapper = new Citymapper();

/* Citymapper */

router.route('/traveltime').get((request, response) => {
  console.log('api/citymapper/traveltime');
  response.json(citymapper.mockedTraveltime());
});

router.route('/houseDepartureTime').get((request, response) => {
  console.log('api/citymapper/houseDepartureTime');

  // Gets scheduled departure date in request parameter.
  let scheduledDepartureDateTime = request.query.scheduledDepartureDateTime;
  response.json(citymapper.houseDepartureTime(scheduledDepartureDateTime));
});

module.exports = router;



