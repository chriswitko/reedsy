(function() {
  'use strict';

  angular
    .module('application', [
      'application.home',
      'templates-app',
      'templates-common',
      'ui.router',
      'toastr'
    ])
    .run(run);

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      // react on state change events
    });
  }
})();
