angular.module('saveMyTrip')
  .component('smtWalletValidation', {
    'templateUrl': 'components/smtWalletValidation.html',
    'controller': function ($state) {
      $ctrl = this;

      $ctrl.chooseRestaurant = function (){
        $state.go('app.hotels');
      };
    },
  });
