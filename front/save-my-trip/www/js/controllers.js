angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.hotelData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.hotelData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };

  // $scope.login();


  $scope.isExpanded = false;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
    navIcons.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }

  ////////////////////////////////////////
  // Layout Methods
  ////////////////////////////////////////

  $scope.hideNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.setExpanded = function(bool) {
    $scope.isExpanded = bool;
  };

  $scope.setHeaderFab = function(location) {
    var hasHeaderFabLeft = false;
    var hasHeaderFabRight = false;

    switch (location) {
      case 'left':
        hasHeaderFabLeft = true;
        break;
      case 'right':
        hasHeaderFabRight = true;
        break;
    }

    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }

  };

  $scope.hideHeader = function() {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function() {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function() {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

  .controller('InfoCtrl', function($scope, $stateParams, $timeout,$state, problemSrv, ionicMaterialMotion, ionicMaterialInk, recastSrv, flySrv) {
    $ctrl = this;

    $scope.title = '';
    $scope.message = 'attendez, on verifie ce qui se passe....';
    $scope.hasExplanation = false;

    $timeout(function(){
      problemSrv.get("000")
        .then(function(res){
          $scope.title = res.data.title;
          $scope.message = "";
          $scope.hasExplanation = true;
        });
    }, 3000);

    $scope.goDialogue = function(){

      $state.go('app.walletValidation');
    };
  })
  .controller('DialogueCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, recastSrv, flySrv) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    var options = {text: 'salut'};
    recastSrv.post(options)
      .then(function(res){
        console.log('recast result');
        console.log(res);
        $scope.bot =   res.data.response.action.reply;
      });


    $scope.validateFly = function(){
      $state.go('app.walletValidation');
    };
    $scope.yesRecast = function (entity, hasRecast) {


      options = {text: 'oui'};
      console.log(options);

      recastSrv.post(options)
        .then(function (resRecast) {
          console.log('recast result');
          $scope.bot = "2 sec je vais voir ça ...";
          $scope.listeEntity = true;
          $scope.listeTransportEntity = [{
            type: 'Autocar',
            duration: '3 h 10',
            price: 'Prise en charge',
            icon: 'ion-android-bus',
            color: 'bg-color-blue'
          },
            {
              type: 'Covoiturage',
              duration: '3 h 10',
              price: '8.60',
              icon: 'carpool',
              color: 'bg-color-white'
            },
            {
              type: 'Voiture de location',
              duration: '3 h 10',
              price: '75',
              icon: 'ion-android-car',
              color: 'bg-color-bluegray'
            }];
          const t2 = [
            {
              type: 'Autocar',
              duration: '3 h 10',
              price: 'Prise en charge',

            },
            {
              type: 'Covoiturage',
              duration: '3 h 10',
              price: '8.60',
              icon: 'carpool',
              color: '#000'
            },
            {
              type: 'Voiture de location',
              duration: '3 h 10',
              price: '75',
              icon: 'ion-android-car'
            },
            {
              type: 'Transport Commun',
              duration: '',
              price: ''
            },
            {
              type: 'Vol',
              duration: '3 h 10',
              price: 'Prise en charge'
            }];
          /*       $timeout(function(){



           flySrv.get(options)
           .then(function(res){

           console.log('flySrv result');
           console.log(JSON.stringify(res));
           res.data.map(function(res){
           if(res) {
           res.type = 'Vol',
           res.icon = 'ion-android-plane',
           res.color = 'bg-color-red'
           }
           })
           $scope.listeEntity = flySrv.planes =  res.data;
           $scope.bot =   resRecast.data.response.action.reply;
           });
           }, 3000);*/

        });

    };

    $scope.yes = function (entity) {
      entity.type = 'Covoiturage1';
      $scope.getdetail(entity, true);
    };

    $scope.no = function (){

    };

    $scope.noRecast = function (){

    };
    $scope.getdetail = function (data, step){

      if(step){
        if(data.duration){
          if(data.type === "Covoiturage" ){
            $scope.bot = " Préciser votre covoiturage: "+ data.type + "?";
          }else{
            $scope.bot = " Choisir le transport : "+ data.type + "?";
          }

        }else{
          $scope.bot = " Je confirme le vol Airfrance : AF"+ data.flyNumber + "?";
        }

      }else{
        if(data.duration){
          if(data.type === "Covoiturage" ){
            $scope.bot = " Vous proposez ou cherchez un : "+ data.type + "?";
          }else{
            $scope.bot = " Choisir le transport : "+ data.type + "?";
          }

        }else{
          $scope.bot = " Je confirme le vol Airfrance : AF"+ data.flyNumber + "?";
        }
      }


      $scope.detailEntity = data
    };
    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
  });
