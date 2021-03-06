angular.module('saveMyTrip')
  .component('smtMapDestination', {
    'templateUrl': 'components/smtMapDestination.html',
    'controller': function ($scope, $state, $cordovaGeolocation, LocationsService, iconSrv, leafletBoundsHelpers, userSrv) {

      $ctrl = this;

      var b = [];
      console.log('--------------');
      console.log($ctrl.markers);
      console.log($ctrl.paths);
      console.log($ctrl.entityDestination);
      for ( var marker in $ctrl.markers){
        b.push($ctrl.markers[marker].lat, $ctrl.markers[marker].lng);
      }
      $ctrl.bounds = leafletBoundsHelpers.createBoundsFromArray(b);

      $ctrl.iconSrv = iconSrv;
      $scope.center = {
        lat: userSrv.position.lat,
        lng: userSrv.position.lng,
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
    'bindings': {
      'markers': '<',
      'paths': '<',
      'entityDestination': '<',
    },
  });
