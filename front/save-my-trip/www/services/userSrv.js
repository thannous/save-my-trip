angular.module('saveMyTrip')

  .factory('userSrv', function ($http, $q, $interval) {
    var userSrv = {};

    userSrv.info = undefined;

    userSrv.networkData = 0;
    userSrv.hotelChoice = undefined;
    userSrv.transportChoice = undefined;
    userSrv.restaurantChoice = undefined;
    userSrv.position = {
      lat: 43.446643,
      lng: 5.222023,
    };

    userSrv.init = function () {
      userSrv.initMoney = 350;
      userSrv.networkData = 120;

      var interval = $interval(function () {
        if (userSrv.networkData > 0) {
          userSrv.networkData--;
        }
        else {
          interval.cancel();
        }
      }, 60000);
    };


    userSrv.computeMoney = function () {
      var m = userSrv.initMoney;

      if (userSrv.hotelChoice) {
        m -= userSrv.hotelChoice.price;
      }

      if (userSrv.transportChoice) {
        m -= userSrv.transportChoice.price;
      }

      if (userSrv.restaurantChoice) {
        m -= userSrv.restaurantChoice.price;
      }

      return m;
    };

    userSrv.get = function (id) {
      //return $http.get('myPath', { params: { id: id }});
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function (resolve, reject) {
        setTimeout(function () {
          var data = {
            data: {
              tickerNumer: id,
              firstname: 'toto',
              lastname: 'titi',
            }
          };
          resolve(data);
        }, 2000);
      });
    };

    return userSrv;
  });
