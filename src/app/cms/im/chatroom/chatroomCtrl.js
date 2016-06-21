//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.cms.im.chatroom')
    .controller('chatroomCtrl', chatroomCtrl);

  /** @ngInject */
  function chatroomCtrl($scope, $filter, $http, util, toastr) {


    $scope.chatrooms = [];

    $scope.getChatrooms = function() {
      $http.get(util.baseApiUrl + 'chatrooms', {})
          .success(function (response) {
              // check if return null
              if (response.return && response.return == 'null'){
                  $scope.chatrooms = [];
              }
              else {
                  $scope.chatrooms = response;
              }

          })
          .error(function(error){
              toastr.error(error.messageFormatted);
          });
    }



  }
})();