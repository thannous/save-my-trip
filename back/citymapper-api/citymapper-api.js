var qs = require("querystring");

var request = require('request');
var proxiedRequest = request.defaults({'proxy': 'http://FLX_PILOTAGE:FLX_PILOTAGE@192.168.77.12:8080'});

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

Citymapper.prototype.get = function get(options, promise) {
  console.log(options);
  request.get({
    url: this.default.base_url + options.url,
    json: true
  }, function (err, data, res) {
    if (err || data.statusCode >= 400) {
      promise.error(err)
    } else {
      console.log('array',Array.of(res).map(d => d.travel_time_minutes + 3));
      promise.next(res);
    }
  });

  return this;
};
