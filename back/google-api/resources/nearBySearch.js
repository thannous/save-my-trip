var qs = require("querystring");

function NearBySearch(google) {
    this._google = google;

}

module.exports = NearBySearch;

NearBySearch.prototype.getHotel= function (parameters,callback) {
    console.log(this._google)
    parameters.key = this._google.defaults.apiKey;
    parameters.location = parameters.location || "48.995417, 2.533997";
    parameters.types = ['lodging'];
    if (typeof parameters.location === "object") parameters.location = parameters.location.toString();
    if (!parameters.rankby) parameters.radius = parameters.radius || 5000;

    return this._google.get({
        url: "/maps/api/place/nearbysearch/json"+ "?" + qs.stringify(parameters)
    }, callback);
};

NearBySearch.prototype.getPlace = function(callback) {
    return this._google.get({}, callback);
};