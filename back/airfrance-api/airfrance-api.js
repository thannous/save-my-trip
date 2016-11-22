/**
 * Module dependencies.
 */

var bodyParser =    require('body-parser');
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
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // log for dev debbug (TODO use morgan)
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });


  /**
   * configure express router for api airfrance
   */
  app.get('/api/airfrance/', function (req, res) {
    console.log('/api/airfrance/');
    proxiedRequest.get('http://fox.klm.com/fox/json/flightstatuses?originAirportCode=AMS&destinationAirportCode=CDG'
    , function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.stringify(body)
          res.json(json);
      }
    });
  });
  app.use('/api/airfrance', airfrance);
};