angular.module('saveMyTrip')
  .component('smtWalletFooter', {
    'templateUrl': 'components/smtWalletFooter.html',
    'bindings': {
      'money': '<',
      'networkData': '<',
    },
  });
