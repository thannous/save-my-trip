angular.module('saveMyTrip')
  .component('smtRestaurants', {
    'templateUrl': 'components/smtRestaurants.html',
    'controller': function ($scope, $state) {
      $ctrl = this;

      $ctrl.showRestaurantQuestion = true;
      $ctrl.showRestaurants = false;


      $ctrl.confirmRestaurant = function () {
        $ctrl.showRestaurantQuestion = false;
      };

      $ctrl.cancelRestaurant = function () {
        $state.go('app.activities');
      };

    },
  });
