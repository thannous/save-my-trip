angular.module('saveMyTrip')
  .component('smtResume', {
    'templateUrl': 'components/smtResume.html',
    'controller': function ($scope, $state, userSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;
    },
  });
