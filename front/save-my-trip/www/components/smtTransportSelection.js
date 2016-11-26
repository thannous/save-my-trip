angular.module('saveMyTrip')
  .component('smtTransportSelection', {
    'templateUrl': 'components/smtTransportSelection.html',
    'controller': function ($scope, $state, transportSrv, userSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;
      $ctrl.transportSrv = transportSrv;

      $ctrl.getTransports = function (options) {
        $ctrl.transportSrv.get(options)
          .then(function (res) {
            console.log('get transport choices');
            console.log(res.data);
            $ctrl.transportSrv.transports = res.data;
          });
      };

      $ctrl.selectTransport = function (transport) {
        userSrv.transportChoice = transport;
        $state.go('app.transportMap');
      };

      $ctrl.getTransports();

    },
  });
