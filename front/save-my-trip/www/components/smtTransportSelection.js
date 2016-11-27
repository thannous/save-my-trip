angular.module('saveMyTrip')
  .component('smtTransportSelection', {
    'templateUrl': 'components/smtTransportSelection.html',
    'controller': function ($scope, $state, transportSrv, userSrv, iconSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;
      $ctrl.iconSrv = iconSrv;
      $ctrl.markers = {
        origin: {
          icon: {
            iconUrl: 'img/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          },
          lat: 43.446643,
          lng: 5.222023,
        },
        destination: {
          icon: {
            iconUrl: 'img/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          },
          lat: 43.66,
          lng: 7.21,
          zoom: 8
        },
      };
      $ctrl.paths = {};

      $ctrl.getTransports = function (type, options) {
        transportSrv.get(options)
          .then(function (res) {
            var t = {
              type: type,
              time: Math.floor(res.data.routes[0].legs[0].duration.value / 60),
              price: Math.floor(Math.random()*90+10),
              path: polyline.decode(res.data.routes[0].overview_polyline.points),
            };

            transportSrv.transports.push(t);
          });
      };

      $ctrl.getVtc = function (options) {
        transportSrv.getVtc(options)
          .then(function (res) {
            // var t = {
            //   type: 'vtc',
            //   time: Math.floor(res.data.routes[0].legs[0].duration.value / 60),
            //   price: Math.floor(Math.random()*90+10),
            //   path: polyline.decode(res.data.routes[0].overview_polyline.points),
            // };
            transportSrv.transports['vtc'] = $ctrl.getTransportIndex('vtc').price = '10000';
            // transportSrv.transports.push(t);
          });
      };

      //polyline.decode('_p~iF~ps|U_ulLnnqC_mqNvxq`@');

      $ctrl.selectTransport = function (transport) {
        userSrv.transportChoice = transport;

        $ctrl.paths.choice = {
          color: 'blue',
          weight: 4,
          latlngs: transport.path,
        };
      };

      $ctrl.getTransportIndex = function (transportType) {
        if (transportSrv.transports.length === 0) {
          return {};
        }
        console.log($ctrl.transportSrv);
        var val = transportSrv.transports.filter(function (f) {
          return transportType === f.type;
        });
        return val[0];
      };

      $ctrl.hasTransport = function () {
        return transportSrv.transports.length > 0;
      };

      var origin = [43.446643, 5.222023];
      var destination = [43.66, 7.21];
      var transitOptions = {
        origin: $ctrl.markers.origin.lat + ', ' + $ctrl.markers.origin.lng,
        destination: $ctrl.markers.destination.lat + ', ' + $ctrl.markers.destination.lng,
        mode: 'transit',
      };

      $ctrl.getTransports('bus', transitOptions);

      var drivingOptions = {
        origin: $ctrl.markers.origin.lat + ', ' + $ctrl.markers.origin.lng,
        destination: $ctrl.markers.destination.lat + ', ' + $ctrl.markers.destination.lng,
        mode: 'driving',
      };

      $ctrl.getTransports('taxi', drivingOptions);

      var VtcOptions = {
        start_latitude: $ctrl.markers.origin.lat,
        start_longitude: $ctrl.markers.origin.lng,
        end_latitude: $ctrl.markers.destination.lat,
        end_longitude: $ctrl.markers.destination.lng,
      };


      //pour uber on calcul l'itineraire pour un taxi mais on calcul le prix apres
      $ctrl.getTransports('vtc', drivingOptions);
      $ctrl.getVtc(VtcOptions);
    },
  });
