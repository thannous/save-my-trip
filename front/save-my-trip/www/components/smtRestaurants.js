angular.module('saveMyTrip')
  .component('smtRestaurants', {
    'templateUrl': 'components/smtRestaurants.html',
    'controller': function ($scope, $state, restaurantSrv, userSrv) {
      $ctrl = this;

      $ctrl.showRestaurantQuestion = true;
      $ctrl.showRestaurants = false;
      $ctrl.options = {};
      $ctrl.restaurants = [];
      $ctrl.userSrv = userSrv;

      $ctrl.confirmRestaurant = function () {
        $ctrl.showRestaurantQuestion = false;
        $ctrl.showRestaurants = true;
        $ctrl.options = {
          location: userSrv.position.lat + ', ' + userSrv.position.lng
        };
        $ctrl.getRestaurants($ctrl.options);
      };

      $ctrl.getRestaurants = function(options){
        restaurantSrv.get(options)
          .then(function(res){
            $ctrl.restaurants = res.data;
          });
      };

      $ctrl.getRestaurantDetails = function(index){

      };

      $ctrl.cancelRestaurant = function () {
        $state.go('app.activities');

      };

      $ctrl.options = {};
      $ctrl.searchRestaurants = function (options) {

      }

    },
  });
