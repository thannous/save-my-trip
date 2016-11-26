angular.module('saveMyTrip')
  .component('smtValidationModal', {
    'templateUrl': 'components/smtValidationModal.html',
    'controller': function ($state) {
      $ctrl = this;

    },
    'bindings': {
      'message': '<',
      'confirmText': '<',
      'confirmFunction': '&',
      'cancelText': '<',
      'cancelFunction': '&',
    },
  });
