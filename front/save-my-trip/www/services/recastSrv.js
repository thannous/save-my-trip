angular.module('saveMyTrip')

  .factory('recastSrv', function($http, $q) {
    var recastSrv = {};
    
    
    recastSrv.post = function(options) {
      return $http.post('http://localhost:8080/api/recast/textConverse', { text: 'salut'});
    }

    return recastSrv;
  });
