angular.module('saveMyTrip')
  .component('smtMapDestination', {
    'templateUrl': 'components/smtMapDestination.html',
    'controller': function ($scope, $state, $cordovaGeolocation, LocationsService, iconSrv, leafletBoundsHelpers) {

      $ctrl = this;

      var b = [];
      for ( var marker in $ctrl.markers){
        b.push($ctrl.markers[marker].lat, $ctrl.markers[marker].lng);
      }
      $ctrl.bounds = leafletBoundsHelpers.createBoundsFromArray(b);

      $ctrl.iconSrv = iconSrv;
      $scope.center = {
        lat: 42.1,
        lng: 2.0,
        zoom: 15
      };

      $ctrl.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          zoomControlPosition: 'bottomleft'
        },
        markers: $ctrl.markers,
        paths: $ctrl.paths,
        bounds: $ctrl.bounds,
      };

    },
    bindinds: {
      markers: '<',
      paths: '<',
      entityDestination: '<',
    },
  });
