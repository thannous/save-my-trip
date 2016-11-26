angular.module('saveMyTrip')
  .component('smtWalletValidation', {
    'templateUrl': 'components/smtWalletValidation.html',
    'controller': function ($state, userSrv) {
      $ctrl = this;
      $ctrl.userSrv = userSrv;

      $ctrl.userSrv.init();

      $ctrl.computeNetworkDataMinute = function(networkData){
        return Math.floor((networkData / 60 ));
      };

      $ctrl.chooseRestaurant = function (){
        $state.go('app.hotels');
      };
    },
  });
