var qs = require("querystring");

function Direction(googleplace) {
  this._google = googleplace;

}

module.exports = Direction;

Direction.prototype.getDirection = function (origin, destination, parameters, callback) {
  parameters.key = this._google.defaults.apiKey;
  parameters.origin = origin || "48.995417, 2.533997";
  parameters.destination = destination || "48.975919, 2.500974";
  parameters.mode = parameters.transit || 'transit';
  return this._google.get({
    url: "/maps/api/directions/json" + "?" + qs.stringify(parameters)
  }, callback);
};
