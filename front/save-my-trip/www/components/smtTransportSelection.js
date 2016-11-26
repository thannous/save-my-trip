angular.module('saveMyTrip')
  .component('smtTransportSelection', {
    'templateUrl': 'components/smtTransportSelection.html',
    'controller': function ($scope, $state, transportSrv, userSrv, iconSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;
      $ctrl.iconSrv = iconSrv;

      $ctrl.getTransports = function (options) {
        transportSrv.get(options)
          .then(function (res) {
            console.log('get transport choices');
            console.log(res.data);




            transportSrv.transports = res.data;
          });
      };

      //polyline.decode('_p~iF~ps|U_ulLnnqC_mqNvxq`@');

      $ctrl.selectTransport = function (transport) {
        userSrv.transportChoice = transport;
        $state.go('app.transportMap');
      };

      $ctrl.getTransportIndex = function (transportType){
        if(transportSrv.transports.length === 0){
          return {};
        }
        console.log($ctrl.transportSrv);
        var val = transportSrv.transports.filter(function(f){
          return transportType === f.type;
        });
        return val[0];
      };

      $ctrl.hasTransport = function(){
        return transportSrv.transports.length > 0;
      };

      var origin = [43.446643, 5.222023];
      var destination = [43.66, 7.21];
      var options  = {
        origin: origin[0]+', '+origin[1],
        destination: destination[0]+', '+destination[1],
      };

      $ctrl.getTransports(options);

    },
  });
