var OAuth = require('oauth');
var util = require('util');

var request = require('request');

var proxiedRequest = request.defaults({'proxy': 'http://FLX_PILOTAGE:FLX_PILOTAGE@192.168.77.12:8080'});

function Airfrance(options) {
  this.defaults = {
    client_id: options.client_id,
    client_secret: options.client_secret,
    server_token: options.server_token,
    redirect_uri: options.redirect_uri,
    name: options.name,
    base_url: this.sandbox ? 'https://sandbox-api.uber.com/' : 'https://api.uber.com/',
    authorize_url: 'https://login.uber.com/oauth/authorize',
    access_token_url: 'https://login.uber.com/oauth/token',
    language: options.language ? options.language : 'fr_FR'
  };

  this.oauth2 = new OAuth.OAuth2(
    this.defaults.client_id,
    this.defaults.client_secret,
    '',
    this.defaults.authorize_url,
    this.defaults.access_token_url
  );

  this.access_token = options.access_token;
  this.refresh_token = options.refresh_token;
};

module.exports = Airfrance;

Airfrance.prototype.flightstatuses = function (promise) {
  request.get('http://fox.klm.com/fox/json/flightstatuses?originAirportCode=AMS&destinationAirportCode=CDG'
    , (error, response, body) => {
      if (!error && response.statusCode == 200) {
        promise.next(body);
      }
    });
};

Airfrance.prototype.flights = function (promise) {
  request.get('https://api.klm.com/flights?origin=CDG&destination=NCE'
    , (error, response, body) => {
      if (!error && response.statusCode == 200) {
        promise.next(body);
      }
    });
};

Airfrance.prototype.user = function (bookingNumber) {
  return {
    firstName: "Ema",
    lastName: "Venesio",
    flightNumber: "KL 1790",
    problemReason: "Vol dérouté à Marseille en raison d'\intempéries sur l'\aéroport de Nice",
    problemImageUrl: "http://172.16.20.30:8080/img/weather/bad.png"
  };
};
