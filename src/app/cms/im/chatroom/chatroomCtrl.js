//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.im.chatroom')
        .controller('chatroomCtrl', chatroomCtrl);

    /** @ngInject */
    function chatroomCtrl($scope, $state, $filter, $http, util, toastr) {


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
        $scope.getChatrooms();

        // goto 聊天室内容
        $scope.goChat = function(chatroomid) {
            $state.go('im.chat', {chatroom: chatroomid});
        }

    }
})();