angular.module('saveMyTrip')
  .component('smtTransportMap', {
    'templateUrl': 'components/smtTransportMap.html',
    'controller': function ($scope, $state, hotelSrv, userSrv, $cordovaGeolocation, LocationsService) {
      $ctrl = this;

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

      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $ctrl.locations = LocationsService.savedLocations;
        $ctrl.newLocation;

        if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Add Locations',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
          });

        }

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

        $ctrl.goTo(0);

      });

      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.name = "";
      };

      /**
       * Detect user long-pressing on map to add new location
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $ctrl.newLocation = new Location();
        $ctrl.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $ctrl.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $ctrl.modal.show();
      });

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      $ctrl.goTo = function(locationKey) {

        var location = LocationsService.savedLocations[locationKey];

        $ctrl.map.center  = {
          lat: 48.864716,
          lng: 2.349014,
          zoom : 12
        };

        $scope.center  = {
          lat: 48.864716,
          lng: 2.349014,
          zoom : 12
        };

        $ctrl.map.markers[locationKey] = {
          lat:location.lat,
          lng:location.lng,
          message: location.name,
          focus: true,
          draggable: false
        };

      };

      /**
       * Center map on user's current position
       */
      $ctrl.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $ctrl.map.center.lat  = position.coords.latitude;
            $ctrl.map.center.lng = position.coords.longitude;
            $ctrl.map.center.zoom = 15;

            $ctrl.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };




    },
  });
