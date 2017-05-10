// factory
angular
  .module('application')
  .factory('socketClient', socketClient);

function socketClient ($rootScope, toastr) {
  var socket = io.connect();
  socket.on('connect', function (data) {
    socket.emit('join', 'Client joined the server');
  });

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    },

    display: function (c) {
      switch(c.status) {
        case 'In Queue':
          toastr.success('Request ' + c.name + ' added to queue');
          break;
        case 'Processing':
          toastr.info('Request ' + c.name + ' started processing');
          break;
        case 'Processed':
          toastr.success('Request ' + c.name + ' processed');
          break;
        default:
          break;
      }
    }
  };
}
