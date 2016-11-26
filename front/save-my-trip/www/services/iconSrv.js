angular.module('saveMyTrip')

  .factory('iconSrv', function ($http, $q) {
    var iconSrv = {};

    iconSrv.transport = {
      'bus': 'android-bus',
      'taxi': 'android-car',
      'vtc': 'model-s',
    }
    return iconSrv;
  });
