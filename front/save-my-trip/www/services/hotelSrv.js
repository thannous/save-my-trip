angular.module('saveMyTrip')

.factory('hotelSrv', function($http, $q, serverIp) {
  var hotelSrv = {};

  hotelSrv.hotels = undefined;

  hotelSrv.get = function(options) {
    return $http.get(serverIp+'api/skyscanner/hotels/livePrices', { params: options});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    // return $q(function(resolve, reject) {
    //   setTimeout(function() {
    //     console.log('hotelSrv get');
    //     var data = {
    //       data: [
    //         { hotelId: '00001', label: 'Hotel 1', address: 'rue de ...', imgUrl: '', price: 100, rate:1},
    //         { hotelId: '00002', label: 'Hotel 2', address: 'rue de ...', imgUrl: '', price: 123, rate:2},
    //         { hotelId: '00003', label: 'Hotel 3', address: 'rue de ...', imgUrl: '', price: 50, rate:2},
    //         { hotelId: '00004', label: 'Hotel 4', address: 'rue de ...', imgUrl: '', price: 900, rate:4},
    //         { hotelId: '00005', label: 'Hotel 5', address: 'rue de ...', imgUrl: '', price: 333, rate:4},
    //         { hotelId: '00006', label: 'Hotel 6', address: 'rue de ...', imgUrl: '', price: 02, rate:5},
    //         { hotelId: '00007', label: 'Hotel 7', address: 'rue de ...', imgUrl: '', price: 100, rate:6},
    //         { hotelId: '00008', label: 'Hotel 8', address: 'rue de ...', imgUrl: '', price: 100, rate:4},
    //         { hotelId: '00009', label: 'Hotel 9', address: 'rue de ...', imgUrl: '', price: 100, rate:2},
    //         { hotelId: '00010', label: 'Hotel 10',address: 'rue de ...', imgUrl: '', price: 100, rate:5},
    //
    //       ],
    //     };
    //     resolve(data);
    //   }, 1000);
    // });
  };

  return hotelSrv;
});
