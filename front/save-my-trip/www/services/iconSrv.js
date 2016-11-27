angular.module('saveMyTrip')

  .factory('iconSrv', function () {
    var iconSrv = {};

    iconSrv.transport = {
      'bus': 'android-bus',
      'taxi': 'android-car',
      'vtc': 'model-s',
    }
    return iconSrv;
  });
