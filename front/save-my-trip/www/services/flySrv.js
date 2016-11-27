angular.module('saveMyTrip')

.factory('flySrv', function($http, $q) {
  var flySrv = {};

  flySrv.planes = undefined;

  flySrv.get = function(options) {
    return $http.get('http://localhost:8080/api/airfrance/flightstatuses', { params: options});
  }

  return flySrv;
});
