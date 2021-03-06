angular.module('saveMyTrip')

  .factory('transportSrv', function ($http, $q, serverIp) {
    var transportSrv = {};

    transportSrv.transports = [];

    transportSrv.get = function (options) {
      return $http.get(serverIp+'/api/google/direction/getdirection', { params: options});

    };

    transportSrv.getVtc = function (options) {
      return $http.get('http://localhost:8080/api/uber/price', { params: options});
    };

    return transportSrv;
  });
