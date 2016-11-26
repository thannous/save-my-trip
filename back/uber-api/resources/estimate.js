function Estimates(uber) {
  this._uber = uber;
  this.path = 'estimates';
}

module.exports = Estimates;

Estimates.prototype.getPriceForRoute = function getPriceForRoute(startLat,
                                                                 startLon, endLat, endLon, seats, callback) {
  // seats is optional
  console.log(typeof seats)
  if (typeof seats === 'function' || typeof seats === 'object') {
    callback = seats;
    // set to the default of 2 seats
    seats = 2;
  }

  if (!startLat || !startLon) {
    return callback(new Error('Invalid starting point latitude & longitude'));
  }

  if (!endLat || !endLon) {
    return callback(new Error('Invalid ending point latitude & longitude'));
  }

  if (!this._uber.isNumeric(seats)) {
    seats = 2;
  }
  console.log("callback",callback)
  return this._uber.get({
    url: this.path + '/price',
    params: {
      start_latitude: startLat,
      start_longitude: startLon,
      end_latitude: endLat,
      end_longitude: endLon,
      seat_count: seats
    },
    server_token: true
  }, callback);
};

Estimates.prototype.getTimeForLocation = function getTimeForLocation(lat, lon, id, callback) {
  if (typeof id === 'function' || typeof id === 'object') {
    console.log("callback",id)
    callback = id;
    id = undefined;
  }

  if (!lat || !lon) {
    return callback(new Error('Invalid latitude & longitude'));
  }

  // add optional product_id in case it's set
  var par = (id && id !== '') ? {
    start_latitude: lat,
    start_longitude: lon,
    product_id: id
  } : {
    start_latitude: lat,
    start_longitude: lon
  };
  
  return this._uber.get({
    url: this.path + '/time',
    params: par,
    server_token: true
  }, callback);
};
