angular.module('saveMyTrip')
  .component('smtActivities', {
    'templateUrl': 'components/smtActivities.html',
    'controller': function ($scope, $state) {
      $ctrl = this;

      $ctrl.showActivityQuestion = true;
      $ctrl.showActivities = false;

      $ctrl.confirmActivity = function () {
        $ctrl.showActivityQuestion = false;
      };

      $ctrl.cancelActivity = function () {
        $state.go('app.resume');
      };

    },
  });
