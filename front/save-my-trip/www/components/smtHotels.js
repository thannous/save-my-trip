angular.module('saveMyTrip')
  .component('smtHotels', {
    'templateUrl': 'components/smtHotels.html',
    'controller': function ($scope, $state, hotelSrv, userSrv) {
      $ctrl = this;

      $ctrl.showHotelquestion = true;
      $ctrl.showHotels = false;
      $ctrl.options = {};
      $ctrl.hotels = [];
      $ctrl.userSrv = userSrv;

      $ctrl.confirmHotel = function () {
        $ctrl.showHotelquestion = false;
        $ctrl.showHotels = true;
        $ctrl.getHotels($ctrl.options);
      };

      $ctrl.getHotels = function(options){
        hotelSrv.get(options)
          .then(function(res){
            $ctrl.hotels = res.data;
          });
      };

      $ctrl.getHotelDetails = function(index){

      }

      $ctrl.cancelHotel = function () {
        $state.go('app.restaurants');

      };

      $ctrl.options = {}
      $ctrl.searchHotels = function (options) {

      }

    },
  });
