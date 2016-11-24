angular.module('saveMyTrip')

.factory('userSrv', function($http, $q) {
  var user = {};

  user.info = undefined;

  user.get = function(id) {
    //return $http.get('myPath', { params: { id: id }});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
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
