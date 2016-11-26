angular.module('saveMyTrip')
  .component('smtActivities', {
    'templateUrl': 'components/smtActivities.html',
    'controller': function ($scope, $state, activitySrv, userSrv) {
      $ctrl = this;

      $ctrl.showActivityQuestion = true;
      $ctrl.showActivities = false;
      $ctrl.options = {};
      $ctrl.activities = [];
      $ctrl.userSrv = userSrv;

      $ctrl.confirmActivity = function () {
        $ctrl.showActivityQuestion = false;
        $ctrl.showActivities = true;
        $ctrl.getActivities($ctrl.options);
      };

      $ctrl.getActivities = function(options){
        activitySrv.get(options)
          .then(function(res){
            console.log('return somes activities');
            console.log('res.data');
            $ctrl.activities = res.data;
          });
      };

      $ctrl.getActivityDetails = function(index){

      }

      $ctrl.cancelActivity = function () {
        $state.go('app.resume');

      };

      $ctrl.options = {};
      $ctrl.searchActivities = function (options) {

      }

    },
  });
