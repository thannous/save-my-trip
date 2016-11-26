var util = require('util');
var request = require('request');


function BlaBlaCar(options) {
  this.defaults = {
		  key:options.key
  };

};

module.exports = BlaBlaCar;

BlaBlaCar.prototype.trips = function (promise) {
	var options = {
	  url: 'https://public-api.blablacar.com/api/v2/trips?fn=Paris&tn=London&locale=en_GB&_format=json&cur=EUR&fc=48.756%257C7.268&tc=48.756%257C7.268&db=2016-09-05&de=2016-09-07&hb=7&he=14&page=1&seats=1&photo=1&fields=user%252Ctrips&sort=trip_price&order=desc&limit=50&radius=10',
	  headers: {
		  key:this.defaults.key,
		  'Accept':'application/json'
	  }
	};
	console.log(options)
	request.get(options
			, (error, response, body) => {
				if (!error && response.statusCode == 200) {
					promise.next(body);
				}
			});
};

