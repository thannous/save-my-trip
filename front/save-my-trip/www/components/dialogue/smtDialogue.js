angular.module('saveMyTrip')
  .component('smtDialogue', {
    'templateUrl': 'components/dialogue/smtDialogue.html',
    'controller': function($scope, recastSrv,$state,$timeout ,ionicMaterialMotion, ionicMaterialInk) {
      $ctrl = this;

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);

      
/*      // Set Header
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);*/


      console.log('dial')
      var options = {};
      // Set Motion
      $timeout(function() {
        ionicMaterialMotion.slideUp({
          selector: '.slide-up'
        });
      }, 300);

      $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
        });
      }, 700);

      // Set Ink
      ionicMaterialInk.displayEffect();


      $ctrl.bot =   "Une personne arrive ...";
      recastSrv.post(options)
        .then(function(res){
          console.log('recast result');

          console.log(res.data.response);
          $ctrl.bot =   res.data.response;
        });


      $ctrl.validateFly = function(){
        $state.go('app.walletValidation');
      }
    },
  });
