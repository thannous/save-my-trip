angular.module('saveMyTrip')

.factory('problemSrv', function($http, $q) {
  var problemSrv = {};

  problemSrv.info = undefined;

  problemSrv.get = function(id) {
    //return $http.get('myPath', { params: { id: id }});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        var data = {
          data: {
            id: id,
            title: "Vol dérouté à Marseille en raison d'intempéries sur l'aéroport de Nice",
            message: 'il ne fait pas beau, vous êtes dans la mouisse....! Mais heureusement on est là!!',
          }
        };
        resolve(data);
      }, 1000);
    });
  };

  return problemSrv;
});
