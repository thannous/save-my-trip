angular.module('saveMyTrip')
  .component('smtHotels', {
    'templateUrl': 'components/smtHotels.html',
    'controller': function ($scope, $state, hotelSrv, userSrv) {
      $ctrl = this;

      //dunno ask for hotel if already selected
      $ctrl.showHotels = false;
      $ctrl.options = {};
      $ctrl.hotels = [];
      $ctrl.userSrv = userSrv;
      $ctrl.showHotelquestion = $ctrl.userSrv.hotelChoice ? false : true;

      $ctrl.confirmHotel = function () {
        $ctrl.showHotelquestion = false;
        $ctrl.showHotels = true;
        $ctrl.getHotels($ctrl.options);
      };

      $ctrl.getHotels = function (options) {
        hotelSrv.get(options)
          .then(function (res) {
            $ctrl.hotels = res.data;
          });
      };

      $ctrl.getHotelDetails = function (index) {

      }

      $ctrl.cancelHotel = function () {
        $state.go('app.restaurants');

      };

      $ctrl.selectHotel = function (hotel) {
        $ctrl.userSrv.hotelChoice = hotel;
        $state.go('app.transportSelection');
      };

    },
  });
