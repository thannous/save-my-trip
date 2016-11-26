const moment = require('moment');

var qs = require("querystring");
var request = require('request');

function Citymapper(options) {
  this.default = {
    apiKey: "a0bc7a0132797045bab9e39b954640e3",
    base_url: "https://developer.citymapper.com"
  }
}

module.exports = Citymapper;

Citymapper.prototype.traveltime = function (parameters, promise) {
  let _this = this;
  parameters.key = this.default.apiKey;
  parameters.startcoord = parameters.startcoord || "48.995417, 2.533997";
  parameters.endcoord = parameters.endcoord || "48.975919, 2.500974";
  this.get({
      url: "/api/1/traveltime/" + "?" + qs.stringify(parameters)
    },
    promise)
};

Citymapper.prototype.mockedTraveltime = function () {
  return {travel_time_minutes: 28};
};

Citymapper.prototype.houseDepartureTime = function (scheduledDepartureDateTime) {

  // Gets travel parameters between house and airport.
  let delayBeforeRecording = 120;
  let travelTime = this.mockedTraveltime().travel_time_minutes;
  let margingError = travelTime * 30 / 100;

  // Gets all travel time. It corresponds to travel with marging error and delay before
  // recording.
  let allTravelMinutes = delayBeforeRecording + travelTime + margingError;

  // Gets flight departure time.
  let scheduledDepartureMinutes = Number.parseFloat(moment(scheduledDepartureDateTime).format("hh.mm")) * 60;

  // Finally we get the estimated time at which the customer must go out.
  let houseDepartureTime = moment.utc().startOf('day').minutes(scheduledDepartureMinutes - allTravelMinutes).format('hh:mm');

  return {houseDepartureTime: houseDepartureTime};
};

Citymapper.prototype.get = function get(options, promise) {
  console.log(options);
  request.get({
    url: this.default.base_url + options.url,
    json: true
  }, function (err, data, res) {
    if (err || data.statusCode >= 400) {
      promise.error(err)
    } else {
      console.log('array', Array.of(res).map(d => d.travel_time_minutes + 3));
      promise.next(res);
    }
  });

  return this;
};
