angular.module('saveMyTrip')
  .component('smtHotels', {
    'templateUrl': 'components/smtHotels.html',
    'controller': function ($scope, $state, $timeout) {
      $ctrl = this;

      $ctrl.showHotelquestion = true;
      $ctrl.showHotels = false;


      $ctrl.confirmHotel = function () {
        $ctrl.showHotelquestion = false;
      };

      $ctrl.cancelHotel = function () {
        $state.go('app.restaurants');
      };

    },
  });
