(function() {
  'use strict';

  angular
    .module('application.home')
    .controller('HomeController', HomeController);

  function HomeController ($http, socketClient) {
    var home = this;

    home.title = 'Home';
    home.status = null;
    home.data = null;

    home.conversions = [];

    socketClient.on('conversions', function (data) {
      home.conversions = data;
    });    

    socketClient.on('add_conversion', function (data) {
      var tmp = [];
      tmp.push(data);
      home.conversions = tmp.concat(home.conversions);
    });    

    socketClient.on('update_status', function (data) {
      home.conversions.map(function(c) {
        if (c._id === data.id) {
          c.status = data.status;
          socketClient.display(c);
        }
        return c;
      });
    });

    home.fetch = function(type) {
      $http({method: 'POST', url: '/api/process/' + type}).
        then(function(response) {
          home.status = response.status;
          home.data = response.data;
        }, function(response) {
          home.data = response.data || 'Request failed';
          home.status = response.status;
      });
    };

    home.newPDF = function() {
      home.fetch('pdf');
    };

    home.newHTML = function() {
      home.fetch('html');
    };
  }
})();
