angular.module('saveMyTrip')
  .component('smtDetectNetwork', {
    'templateUrl': 'components/smtDetectNetwork.html',
    'controller': function($state) {
      var $ctrl = this;
      console.log('test');

      $ctrl.networkStatus = 'Recherche du réseau';

      document.addEventListener("online", onOnline, false);
      document.addEventListener("offline", onOffline, false);
      $state.go('connectUser');
      function onOnline() {
        console.log('-----------------onOnline------------------------');
        $state.go('connectUser');
      }

      function onOffline() {
        console.log('-----------------onOnline------------------------');
        $ctrl.networkStatus = 'pas de réseau';
      }
    },
  });
