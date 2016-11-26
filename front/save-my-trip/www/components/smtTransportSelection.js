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

      $ctrl.getTransports();

    },
  });
