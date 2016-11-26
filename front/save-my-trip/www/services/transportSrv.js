angular.module('saveMyTrip')

  .factory('transportSrv', function($http, $q) {
    var transportSrv = {};

    transportSrv.restaurants = undefined;

    transportSrv.get = function(options) {
      //return $http.get('myPath', { params: options});
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
        setTimeout(function() {
          console.log('transportSrv get');
          var data = {
            data: {
              vtc: { price: 1000, time: 35},
              taxi: { price: 30, time: 300},
              bus: { price: 1605, time: 30},
            },
          };
          resolve(data);
        }, 1000);
      });
    };

    return transportSrv;
  });
