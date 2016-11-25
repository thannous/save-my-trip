var request = require('request');

var resources = {
    NearBySearch: require('./resources/nearBySearch')
};

function GooglePlaces(options) {
  
    this.defaults = {
        apiKey: options.apiKey,
        hostname: "maps.googleapis.com",
     
    };

    this.resources = resources;


    this._initResources();
}

GooglePlaces.prototype._initResources = function() {
    for (var name in this.resources) {
        if ({}.hasOwnProperty.call(this.resources, name)) {
            this[name.toLowerCase()] = new resources[name](this);
        }
    }
};

GooglePlaces.prototype.get = function get(options, promise) {

    console.log(options);
    request.get({
        url: "https://maps.googleapis.com" + options.url,
        json: true
    }, function(err, data, res) {
        if (err || data.statusCode >= 400) {
            promise.error(err)
        } else {
            promise.next(res);
        }
    });

    return this;
};
module.exports  = GooglePlaces;

