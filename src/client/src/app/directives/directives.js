(function() {
  'use strict';

  angular
    .module('application')
    .directive('status', status)
    .directive('label', label);

  function status () {
    var directive = {
      templateUrl: '../client/src/app/directives/status.tpl.html',
      restrict: 'EA',
      scope: {
        code: '='
      },
      controller: StatusController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  function StatusController () {
    var vm = this;
  }

  function label () {
    var directive = {
      templateUrl: '../client/src/app/directives/label.tpl.html',
      restrict: 'EA',
      scope: {
        code: '='
      },
      controller: LabelController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  function LabelController () {
    var vm = this;
  } 
})();
