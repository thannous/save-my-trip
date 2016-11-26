angular.module('saveMyTrip')
  .component('smtDialogue', {
    'templateUrl': 'components/dialogue/smtDialogue.html',
    'controller': function($state, recastSrv) {
      $ctrl = this;
      console.log('dial')
      var options = {};
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
