angular.module('saveMyTrip')

.factory('hotelSrv', function($http, $q, serverIp) {
  var hotelSrv = {};

  hotelSrv.hotels = undefined;
  // options = {
  //   market: 'FR',
  //   currency: 'EUR',
  //   locale: 'fr-FR',
  //   entityId: userSrv.position.lat + ',' + userSrv.position.lng + '-latlong',
  //   checkindate: moment().format('YYYY-MM-DD'),
  //   checkoutdate: moment().add('days', 2).format('YYYY-MM-DD'),
  //   guests: 1,
  //   rooms: 1
  // };
  hotelSrv.get = function(options) {
    // return $http.get(serverIp+'api/skyscanner/hotels/livePrices', { params: options});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
        $http.get(serverIp+'api/skyscanner/hotels/livePrices', { params: options})
          .then(function(res){
            console.log(res);
            res.data = res.data.map(function(m){
              return {
                hotelId: m.hotel_id,
                distance: m.distance_from_search,
                label: m.name,
                address: m.address,
                imgUrl: m.image_ref_url,
                rate: m.star_rating,
              };
            });
            console.log(res);
          resolve(res);
        });
    });
  };

  return hotelSrv;
});
