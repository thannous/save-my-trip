angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    //Perform the login action when the user submits the login form
    $scope.doLogin = function () {
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
      navIcons.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function () {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function () {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function () {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    $scope.setExpanded = function (bool) {
      $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function (location) {
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

    $scope.hasHeader = function () {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }

    };

    $scope.hideHeader = function () {
      $scope.hideNavBar();
      $scope.noHeader();
    };

    $scope.showHeader = function () {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    $scope.clearFabs = function () {
      var fabs = document.getElementsByClassName('button-fab');
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove();
      }
    };
  })

  .controller('InfoCtrl', function ($scope, $stateParams, $timeout, $state, problemSrv, ionicMaterialMotion, ionicMaterialInk, recastSrv, flySrv) {

    $ctrl = this;

    $scope.title = '';
    $scope.message = 'attendez, on verifie ce qui se passe....';
    $scope.hasExplanation = false;

    $timeout(function () {
      problemSrv.get("000")
        .then(function (res) {
          $scope.title = res.data.title;
          $scope.message = "";
          $scope.hasExplanation = true;
        });
    }, 3000);

    $scope.goDialogue = function () {

      $state.go('app.walletValidation');
    };
  })
  .controller('DialogueCtrl', function($scope, $stateParams, $timeout, $interval,ionicMaterialMotion, ionicMaterialInk, recastSrv, flySrv) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.isTalking = true;
    $scope.inSearch= true;
    $scope.listeTransportEntity = [
      {
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

    var options = {text: 'salut'};
    recastSrv.post(options)

      .then(function(res) {

        $scope.speakBot(res.data.response.action.reply);
        $scope.inSearch = false;
        $scope.isTalking = false;
        //$scope.inSearch = false;
        //
      });
    $scope.speakBot = function(text){

      $scope.bot = text;

    };
    var final_transcript = '';
    $scope.speechRecognition = function(){
      var recognition = new webkitSpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.onresult = function(event) {
        $scope.inSearch= true;
        console.log(event)
        var interim_transcript = '';
        var final_transcript = ''
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        final_transcript = final_transcript;
        var options = {text: final_transcript};
        console.log("final_transcript", final_transcript);
        $scope.final = linebreak(final_transcript);
        $scope.interim = linebreak(interim_transcript);

        recastSrv.post(options)
          .then(function (resRecast) {
            $scope.inSearch = false;
            $scope.bot = resRecast.data.response.action.reply;
            $scope.listeEntity = true;
            $scope.listeTransportEntity = [
              {
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
            var transport = resRecast.data.response.memory.transport.value;
            var action = resRecast.data.response.action.slug;

            console.log(transport);
            if(action == 'transport' && transport){
              if(transport === 'transport en commun' || transport === 'commun' || transport === 'transport'  ){
                $scope.getdetail(
                  {    type: 'transport en commun',
                  duration: '10',
                  price: '4',
                  icon: 'ion-android-bus',
                  color: 'bg-color-blue'},
                  false);
              }else{
                var indexEntity = $scope.listeTransportEntity.findIndex(function (res) {
                  return res.type.toLowerCase() === transport;
                });
                console.log(indexEntity);
                $scope.getdetail($scope.listeTransportEntity[indexEntity], true);
              }

            }else{

            }
          })
      };
      recognition.start();
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    $scope.validateFly = function () {
      $state.go('app.walletValidation');
    };
    $scope.yesRecast = function (entity, hasRecast) {


      options = {text: 'oui'};
      console.log(options);
      $scope.inSearch= true;
      recastSrv.post(options)
        .then(function (resRecast) {
          $scope.inSearch = false;
          $scope.bot =   resRecast.data.response.action.reply;
          $scope.listeEntity = true;
          // $scope.listeTransportEntity = [{
          //   type: 'Autocar',
          //   duration: '3 h 10',
          //   price: 'Prise en charge',
          //   icon: 'ion-android-bus',
          //   color: 'bg-color-blue'
          // },
          //   {
          //     type: 'Covoiturage',
          //     duration: '3 h 10',
          //     price: '8.60',
          //     icon: 'carpool',
          //     color: 'bg-color-white'
          //   },
          //   {
          //     type: 'Voiture de location',
          //     duration: '3 h 10',
          //     price: '75',
          //     icon: 'ion-android-car',
          //     color: 'bg-color-bluegray'
          //   }];
          // const t2 = [
          //   {
          //     type: 'Autocar',
          //     duration: '3 h 10',
          //     price: 'Prise en charge',
          //
          //   },
          //   {
          //     type: 'Covoiturage',
          //     duration: '3 h 10',
          //     price: '8.60',
          //     icon: 'carpool',
          //     color: '#000'
          //   },
          //   {
          //     type: 'Voiture de location',
          //     duration: '3 h 10',
          //     price: '75',
          //     icon: 'ion-android-car'
          //   },
          //   {
          //     type: 'Transport Commun',
          //     duration: '',
          //     price: ''
          //   },
          //   {
          //     type: 'Vol',
          //     duration: '3 h 10',
          //     price: 'Prise en charge'
          //   }];

          flySrv.get(options)
            .then(function (res) {
              $scope.listeEntity = flySrv.planes = res.data.flights.map(function (res) {
                console.log(res);
                return {
                  type: 'Vol',
                  icon: 'ion-android-plane',
                  color: 'bg-color-red',
                  departure: {
                    location: res.operatingFlightLeg.departsFrom.IATACode,
                    hours: moment(res.operatingFlightLeg.scheduledDepartureDateTime).format('hh:mm'),
                  },
                  arrival: {
                    location: res.operatingFlightLeg.arrivesOn.IATACode,
                    hours: moment(res.operatingFlightLeg.scheduledArrivalDateTime).format('hh:mm'),
                  },
                  flyNumber: res.carrier.code+res.flightNumber,
                };

              })
              $scope.bot = resRecast.data.response.action.reply;
            });
        });

    };

    $scope.yes = function (entity) {
      if(entity.type == 'Covoiturage'){
        entity.type = 'Covoiturage1';
        $scope.getdetail(entity, true);
      }else{
        $scope.bot = "Veuillez signer la decharge";
        entity.type = 'Decharge';
      }

    };


    $scope.no = function (entity){
      if(entity.type === 'Covoiturage'){

        $scope.getdetail(entity, true);
        entity.type = 'Covoiturage2';
        $scope.listeEntity = {


        }
      }
    };

    $scope.noRecast = function () {

    };
    $scope.getdetail = function (data, step){

      if(step){
        if(data.duration){
          if(data.type === "Covoiturage1" ){
            $scope.bot = " Définir votre covoiturage";
          }else{
            $scope.bot = " Voici les details de votre "+ data.type + "";

          }

        } else {
          $scope.bot = " Je confirme le vol Airfrance : AF" + data.flyNumber + "?";
        }
      }else{
        if(data.duration){
          if(data.type === "Covoiturage" ){
            $scope.bot = "Proposez ou cherchez un covoiturage";
          }else{
            $scope.bot = " Voici les details de votre "+ data.type + "";
          }

        } else {
          $scope.bot = " Je confirme le vol Airfrance : AF" + data.flyNumber + "?";
        }
      }


      $scope.detailEntity = data
    };
    // Set Motion
    $timeout(function () {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function () {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    function capitalize(s) {
      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }
  });
