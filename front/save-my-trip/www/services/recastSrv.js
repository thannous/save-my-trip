angular.module('saveMyTrip')

  .factory('recastSrv', function($http, $q,serverIp) {
    var recastSrv = {};


    recastSrv.post = function(options) {
      return $http.post(serverIp + 'api/recast/textConverse', options);
    }

    return recastSrv;
  });
