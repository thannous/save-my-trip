/**
 * Module dependencies.
 */


/*var logger =        require('../logger');*/

//route dependence
var airfrance =   require('./airfrance-api.router');
var request = require('request');

var proxiedRequest = request.defaults({'proxy':'http://FLX_PILOTAGE:FLX_PILOTAGE@192.168.77.12:8080'});
/**
 * configureExpress.js
 *
 * @description :: configure express middleware
 **/

module.exports = function airfranceApi(app) {

  function flightstatuses(subject) {
    console.log("subject",subject)
    proxiedRequest.get('http://fox.klm.com/fox/json/flightstatuses?originAirportCode=AMS&destinationAirportCode=CDG'
      , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          subject.next(body);
        }
      });
  }

  /**
   * configure express router for direct api airfrance
   */

  app.use('/api/airfrance', airfrance);
  return {
    flightstatuses : flightstatuses
  }
};