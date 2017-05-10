(function() {
  'use strict';

  angular
    .module('application')
    .config(ApplicationConfig);

  function ApplicationConfig($urlRouterProvider, $httpProvider, $sceDelegateProvider) {
    $urlRouterProvider.otherwise('home');

    $sceDelegateProvider.resourceUrlWhitelist([
      'self'
    ]);
  }
})();
