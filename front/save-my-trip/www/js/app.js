// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'saveMyTrip' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('saveMyTrip', ['ionic', 'ionic-material', 'ionMdInput','starter.controllers', 'ngCordova', 'leaflet-directive']);
angular.module('saveMyTrip')
  // .value('serverIp', 'http://172.16.20.30:8080/')
   .value('serverIp', 'http://localhost:8080/')
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('problemInfo2', {
        url: '/problemInfo2',
        templateUrl: 'templates/infoVol.html',
        controller: 'InfoCtrl'
      })

      .state('detectNetwork', {
        url: '/detectNetwork',
        template: '<smt-detect-network></smt-detect-network>'
      })

      .state('connectUser', {
        url: '/connectUser',
        template: '<smt-connect-user></smt-connect-user>'
      })

      .state('problemInfo', {
        url: '/problemInfo',
        template: '<smt-problem-info></smt-problem-info>'
      })

      .state('app.nextFly', {
        url: '/nextFly',
        views: {
          'menuContent': {
            template: '<smt-next-fly></smt-next-fly>'
          },
        },
      })
      .state('app.dialogue', {
        url: '/dialogue',
        views: {
          'menuContent': {
            templateUrl: 'templates/dialogue.html',
            controller: 'DialogueCtrl'

          }
        }
      })
      .state('app.walletValidation', {
        url: '/walletValidation',
        views: {
          'menuContent': {
            template: '<smt-wallet-validation></smt-wallet-validation>'
          },
        },
      })

      .state('app.hotels', {
        url: '/hotels',
        views: {
          'menuContent': {
            template: '<smt-hotels></smt-hotels>',
          },
        },
      })

      .state('app.transportSelection', {
        url: '/transportSelection',
        views: {
          'menuContent': {
            template: '<smt-transport-selection></smt-transport-selection>',
          },
        },
      })

      // .state('app.transportMap', {
      //   url: '/transportMap',
      //   views: {
      //     'menuContent': {
      //       template: '<smt-transport-map></smt-transport-map>',
      //     },
      //   },
      // })

      .state('app.restaurants', {
        url: '/restaurants',
        views: {
          'menuContent': {
            template: '<smt-restaurants></smt-restaurants>',
          },
        },
      })

      .state('app.activities', {
        url: '/activities',
        views: {
          'menuContent': {
            template: '<smt-activities></smt-activities>',
          },
        },
      })

      .state('app.resume', {
        url: '/resume',
        views: {
          'menuContent': {
            template: '<smt-resume></smt-resume>',
          },
        },
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/detectNetwork');
  });
