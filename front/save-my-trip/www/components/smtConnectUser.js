angular.module('saveMyTrip')
  .component('smtConnectUser', {
    'templateUrl': 'components/smtConnectUser.html',
    'controller': function($scope, $state, $cordovaBarcodeScanner, userSrv, $state,$timeout ,ionicMaterialMotion, ionicMaterialInk) {
      $ctrl = this;

      $ctrl.reservationNumber = '';

      // barcode
      $ctrl.scanBarcode = function() {
        //permission
        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.CAMERA, checkPermissionCallback, null);

        function checkPermissionCallback(status) {
          if (!status.hasPermission) {
            var errorCallback = function() {
              console.warn('Camera permission is not turned on');
            }
            permissions.requestPermission(
              permissions.CAMERA,
              function(status) {
                if (!status.hasPermission) {
                  errorCallback()
                } else {
                  launchScanBar()
                };

              },
              errorCallback);
          } else {
            launchScanBar()
          }
        }

      };

      function launchScanBar() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);

          $ctrl.reservationNumber = imageData.text;

          $ctrl.validateReservationNumber($ctrl.reservationNumber);


        }, function(error) {
          console.log("An error happened -> " + error);
        });
      }


      $ctrl.validateReservationNumber = function(reservationNumBer){
        //alert(reservationNumBer);
        console.log('validateReservationNumber');
        userSrv.get(reservationNumBer)
        .then(function(res){
          userSrv.info = res.data;
          userSrv.position.lat = 42.1;
          userSrv.position.lng = 2.0;

          console.log('userSrv.info');
          console.log( JSON.stringify(userSrv.info));
          $state.go('problemInfo2');
        })
      };


      ionicMaterialInk.displayEffect();
    },
  });
