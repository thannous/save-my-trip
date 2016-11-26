angular.module('saveMyTrip')

.factory('activitySrv', function($http, $q) {
  var activitySrv = {};

  activitySrv.activities = undefined;

  activitySrv.get = function(options) {
    //return $http.get('myPath', { params: options});
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        console.log('activitySrv get');
        var data = {
          data: [
            { activityId: '00001', label: 'Activity 1', address: 'rue de ...', imgUrl: '', price: 100, rate:1},
            { activityId: '00002', label: 'Activity 2', address: 'rue de ...', imgUrl: '', price: 123, rate:2},
            { activityId: '00003', label: 'Activity 3', address: 'rue de ...', imgUrl: '', price: 50, rate:2},
            { activityId: '00004', label: 'Activity 4', address: 'rue de ...', imgUrl: '', price: 900, rate:4},
            { activityId: '00005', label: 'Activity 5', address: 'rue de ...', imgUrl: '', price: 333, rate:4},
            { activityId: '00006', label: 'Activity 6', address: 'rue de ...', imgUrl: '', price: 02, rate:5},
            { activityId: '00007', label: 'Activity 7', address: 'rue de ...', imgUrl: '', price: 100, rate:6},
            { activityId: '00008', label: 'Activity 8', address: 'rue de ...', imgUrl: '', price: 100, rate:4},
            { activityId: '00009', label: 'Activity 9', address: 'rue de ...', imgUrl: '', price: 100, rate:2},
            { activityId: '00010', label: 'Activity 10',address: 'rue de ...', imgUrl: '', price: 100, rate:5},

          ],
        };
        resolve(data);
      }, 1000);
    });
  };

  return activitySrv;
});
