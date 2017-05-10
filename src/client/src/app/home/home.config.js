(function() {
  'use strict';

  angular
    .module('application.home', ['ui.router'])
    .config(HomeConfig);

  function HomeConfig ($stateProvider) {
    $stateProvider.state( 'home', {
      url: '/home',
      views: {
        'main': {
          controller: 'HomeController',
          controllerAs: 'home',
          templateUrl: '../client/src/app/home/home.tpl.html'
        }
      }
    });
  }
})();
