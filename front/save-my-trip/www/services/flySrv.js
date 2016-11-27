angular.module('saveMyTrip')

.factory('flySrv', function($http, $q, serverIp) {
  var flySrv = {};

  flySrv.planes = undefined;

  flySrv.get = function(options) {
    return $http.get(serverIp+'api/airfrance/flightstatuses', { params: options});
  };

  return flySrv;
});
