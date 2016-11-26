angular.module('saveMyTrip')

.directive('smtErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {

      scope.$watch(function() {
        return attrs['ngSrc'];
      }, function (value) {
        if (!value) {
          element.attr('src', attrs.smtErrorSrc);
        }
      });

      element.bind('error', function() {
        element.attr('src', attrs.smtErrorSrc);
      });
    }
  }
});
