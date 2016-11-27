var qs = require("querystring");

function Direction(googleplace) {
  this._google = googleplace;

}

module.exports = Direction;

Direction.prototype.getDirection = function (parameters, callback) {
  parameters.key = this._google.defaults.apiKey;

  // If request parameters are empty, we replace them by a default value.
  parameters.origin = parameters.origin || "48.995417, 2.533997";
  parameters.destination = parameters.destination || "48.975919, 2.500974";
  parameters.mode = parameters.mode || 'transit';
  return this._google.get({
    url: "/maps/api/directions/json" + "?" + qs.stringify(parameters)
  }, callback);
};
