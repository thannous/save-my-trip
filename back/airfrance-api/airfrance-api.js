var ClientOAuth2 = require('client-oauth2')
var util = require('util');

var request = require('request');

/**
 * Default headers .
 */
var DEFAULT_HEADERS = {
  'Accept': 'application/hal+json;version=com.afkl.operationalflight.v1'
}

function Airfrance(options) {
  this.defaults = {
    client_id: options.client_id,
    client_secret: options.client_secret,
    server_token: options.server_token,
    redirect_uri: options.redirect_uri,
    name: options.name,
    base_url: options.base_url,
    authorize_url: options.authorize_url,
    access_token_url: options.access_token_url,
    language: options.language ? options.language : 'fr_FR'
  };
  
  this.clientAuth = new ClientOAuth2({
	  clientId: this.defaults.client_id,
	  clientSecret: this.defaults.client_secret,
	  accessTokenUri: this.defaults.access_token_url,
	  authorizationUri: this.defaults.authorize_url
	})
  let accessToken=undefined;
  this.getToken();
};

module.exports = Airfrance;

Airfrance.prototype.flightstatuses = function (promise) {
	var options = {
	  url: this.defaults.base_url+'/flightstatus?access_token='+accessToken,
	  headers: DEFAULT_HEADERS
	};
	console.log(options)
	request.get(options
			, (error, response, body) => {
				if (!error && response.statusCode == 200) {
					promise.next(body);
				}
			});
};

Airfrance.prototype.getToken = function () {
	this.clientAuth.credentials.getToken()
	  .then(function (user) {
		  accessToken=user.accessToken;
		  console.log(accessToken)
	  })
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
