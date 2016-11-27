angular.module('saveMyTrip')
  .component('smtNextFly', {
    'templateUrl': 'components/smtNextFly.html',
    'controller': function($state, flySrv) {
      $ctrl = this;
      $ctrl.flyToShow = undefined;

      $ctrl.planes = flySrv.planes = [];
      var options = {};

      // flySrv.get(options)
      // .then(function(res){
      //   console.log('flySrv result');
      //   console.log(JSON.stringify(res));
      //   $ctrl.planes = flySrv.planes =  res.data;
      // });

      $ctrl.getPlaneDetails = function ( $index){

        $ctrl.flyToShow = $ctrl.flyToShow !== $index ? $index : undefined;
      };

      $ctrl.showFlyDetails = function ($index){
        return $ctrl.flyToShow === $index;
      };

      $ctrl.validateFly = function(){
        $state.go('app.walletValidation');
      }
    },
  });
