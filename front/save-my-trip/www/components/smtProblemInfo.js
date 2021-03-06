angular.module('saveMyTrip')
  .component('smtProblemInfo', {
    'templateUrl': 'components/smtProblemInfo.html',
    'controller': function($state, $timeout, userSrv, problemSrv) {
      $ctrl = this;

      $ctrl.title = '';
      $ctrl.message = 'attendez, on verifie ce qui se passe....';
      $ctrl.hasExplanation = false;

      $timeout(function(){
        problemSrv.get("000")
        .then(function(res){
          $ctrl.title = res.data.title;
          $ctrl.message = res.data.message;
          $ctrl.hasExplanation = true;
        });
      }, 2000);

      $ctrl.gotoNextFlySelection = function(){
        $state.go('app.walletValidation');
      };

    },
  });
