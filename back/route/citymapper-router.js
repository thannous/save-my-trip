#!/usr/bin/env node
const Rx = require('rxjs');
const moment = require('moment');
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
  // Gets travel parameters between house and airport.
  let delayBeforeRecording = 120;
  let travelTime = citymapper.mockedTraveltime().travel_time_minutes;
  let margingError = travelTime * 30 / 100;

  // Gets all travel time. It corresponds to travel with marging error and delay before
  // recording.
  let allTravelMinutes = delayBeforeRecording + travelTime + margingError;

  // Gets flight departure time.
  let scheduledDepartureDateTime = request.query.scheduledDepartureDateTime;
  let scheduledDepartureMinutes = Number.parseFloat(moment('2016-11-25T10:55+01:00').format("hh.mm")) * 60;

  // Finally we get estimated the time at which the customer must go out.
  // let hours = moment.duration(scheduledDepartureMinutes - allTravelMinutes, 'minutes').asHours();
  // let houseDepartureTime = moment(hours, 'hours').format("HH:mm");
  let houseDepartureTime = moment.utc().startOf('day').minutes(scheduledDepartureMinutes - allTravelMinutes).format('hh:mm');

  response.json(houseDepartureTime);
});

module.exports = router;



