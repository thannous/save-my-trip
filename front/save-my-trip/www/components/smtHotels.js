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
        // market: "FR",
        //   currency: "EUR",
        //   locale: "fr-FR",
        //   entityId: "48.853,2.35-latlong",
        //   checkindate: "2016-11-27",
        //   checkoutdate: "2016-11-29",
        //   guests: 1,
        //   rooms: 1
        $ctrl.options = {
          market: 'FR',
          currency: 'EUR',
          locale: 'fr-FR',
          entityId: userSrv.position.lat + '' + userSrv.position.lng + '-latlong',
          checkindate: moment().format('YYYY-MM-DD'),
          checkoutdate: moment().add('days', 2).format('YYYY-MM-DD'),
          guests: 1,
          rooms: 1
        };

        $ctrl.getHotels($ctrl.options);
      };

      $ctrl.getHotels = function (options) {
        hotelSrv.get(options)
          .then(function (res) {
            console.log(res);
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
