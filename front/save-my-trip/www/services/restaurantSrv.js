angular.module('saveMyTrip')

.factory('restaurantSrv', function($http, $q) {
  var restaurantSrv = {};

  restaurantSrv.restaurants = undefined;

  restaurantSrv.get = function(options) {
    //return $http.get('myPath', { params: options});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        console.log('restaurantSrv get');
        var data = {
          data: [
            { restaurantId: '00001', label: 'Restaurant 1', address: 'rue de ...', imgUrl: '', price: 100, rate:1},
            { restaurantId: '00002', label: 'Restaurant 2', address: 'rue de ...', imgUrl: '', price: 123, rate:2},
            { restaurantId: '00003', label: 'Restaurant 3', address: 'rue de ...', imgUrl: '', price: 50, rate:2},
            { restaurantId: '00004', label: 'Restaurant 4', address: 'rue de ...', imgUrl: '', price: 900, rate:4},
            { restaurantId: '00005', label: 'Restaurant 5', address: 'rue de ...', imgUrl: '', price: 333, rate:4},
            { restaurantId: '00006', label: 'Restaurant 6', address: 'rue de ...', imgUrl: '', price: 02, rate:5},
            { restaurantId: '00007', label: 'Restaurant 7', address: 'rue de ...', imgUrl: '', price: 100, rate:6},
            { restaurantId: '00008', label: 'Restaurant 8', address: 'rue de ...', imgUrl: '', price: 100, rate:4},
            { restaurantId: '00009', label: 'Restaurant 9', address: 'rue de ...', imgUrl: '', price: 100, rate:2},
            { restaurantId: '00010', label: 'Restaurant 10',address: 'rue de ...', imgUrl: '', price: 100, rate:5},

          ],
        };
        resolve(data);
      }, 1000);
    });
  };

  return restaurantSrv;
});
