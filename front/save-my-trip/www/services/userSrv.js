angular.module('saveMyTrip')

  .factory('userSrv', function ($http, $q, $interval) {
    var user = {};

    user.info = undefined;
    user.money = 0;
    user.networkData = 0;

    user.init = function () {
      user.money = 350;
      user.networkData = 120;

      var interval = $interval(function () {
        if (user.networkData > 0) {
          user.networkData--;
        }
        else {
          interval.cancel();
        }
      }, 60000);
    };

    user.get = function (id) {
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

    return user;
  });
