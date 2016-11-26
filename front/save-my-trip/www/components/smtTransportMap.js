angular.module('saveMyTrip')
  .component('smtTransportMap', {
    'templateUrl': 'components/smtTransportMap.html',
    'controller': function ($scope, $state, userSrv, $cordovaGeolocation, LocationsService, iconSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;
      $ctrl.iconSrv = iconSrv;

      $scope.center = {
        lat: 42.1,
        lng: 2.0,
        zoom: 15
      };

      $ctrl.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'bottomleft'
        },
        markers : {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };

     },
  });
