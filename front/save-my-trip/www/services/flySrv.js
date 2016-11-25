angular.module('saveMyTrip')

.factory('flySrv', function($http, $q) {
  var flySrv = {};

  flySrv.planes = undefined;

  flySrv.get = function(options) {
    //return $http.get('myPath', { params: options});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        console.log('flySrv get');
        var data = {
          data: [
            { flyNumber: '00001', departure: {location: 'Paris', hours: '10:00'}, arrival: {location: 'Marseille', hours: '12:00'}},
            { flyNumber: '00001', departure: {location: 'Paris', hours: '12:00'}, arrival: {location: 'Marseille', hours: '13:00'}},
            { flyNumber: '00001', departure: {location: 'Paris', hours: '14:00'}, arrival: {location: 'Marseille', hours: '15:00'}},
            { flyNumber: '00001', departure: {location: 'Paris', hours: '16:00'}, arrival: {location: 'Marseille', hours: '17:00'}},
            { flyNumber: '00001', departure: {location: 'Paris', hours: '17:00'}, arrival: {location: 'Marseille', hours: '18:00'}},
            { flyNumber: '00001', departure: {location: 'Paris', hours: '18:00'}, arrival: {location: 'Marseille', hours: '19:00'}},
          ],
        };
        resolve(data);
      }, 1000);
    });
  };

  return flySrv;
});
