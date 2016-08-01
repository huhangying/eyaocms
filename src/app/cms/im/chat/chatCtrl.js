
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.im.chat')
        .controller('chatCtrl', chatCtrl);

    /** @ngInject */
    function chatCtrl($scope, $state, $filter, $http, util, toastr) {

        $scope.search = {};

        $scope.chatrooms = [];
        $scope.loadChatrooms = function() {
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

        $scope.loadChatrooms();

        $scope.showChatroom = function(item) {
            if(item.chatroom && $scope.chatrooms.length) {
                var selected = $filter('filter')($scope.chatrooms, {_id: item.chatroom});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };

        $scope.chats = [];
        $scope.getChats = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'chats', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.chats = [];
                    }
                    else {
                        $scope.chats = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getChats();

        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.chatroom) {
                $scope.search.chatroom = $state.params.chatroom;
            }
        });


        //==============================================


        $scope.addChat = function() {
            $scope.inserted = {
                chatroom: $scope.search.chatroom || null,
                name: '',
                direction: 0,
                data: ''
            };


            $scope.chats.push($scope.inserted);
        }

        $scope.removeChat = function(id) {

            $http.delete(util.baseApiUrl + 'chat/' + id)
                .success(function (response) {
                    $scope.chats = $filter('filter')($scope.chats, {_id: '!'+id});

                    toastr.success('成功删除');
                });
        }

        $scope.validate = function(item) {

            if (!item.chatroom){
                toastr.error('聊天室不能为空!');
                return false;
            }
            if (!item || !item.data){
                toastr.error('聊天内容不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveChat = function(data, id) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!id) { // create
                $http.post(util.baseApiUrl + 'chat', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.chats.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };
                        $scope.inserted = response;

                        $scope.chats.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.chats.splice($scope.chats.length - 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'chat/' + id, data)
                    .success(function (response) {
                        //console.log(JSON.stringify(response))
                        if (!response) {
                            toastr.error(error.messageFormatted);
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    })
                    .error(function(err){
                        toastr.error(err.messageFormatted)
                    });
            }

            //$scope.inserted = null;

        }

        $scope.deleteChatroomContent = function() {
            if (!$scope.search.chatroom) {
                return toastr.warn('请先选择一个聊天室');
            }

            $http.delete(util.baseApiUrl + 'chats/chatroom/' + $scope.search.chatroom)
                .success(function (response) {
                    // 删除聊天室内的内容
                    $scope.chats = $filter('filter')($scope.chats, {chatroom: '!'+$scope.search.chatroom});

                    //删除聊天室
                    $http.delete(util.baseApiUrl + 'chatroom/' + $scope.search.chatroom)
                        .success(function (rsp) {
                            $scope.chatrooms = $filter('filter')($scope.chatrooms, {_id: '!'+$scope.search.chatroom});

                            toastr.success('成功删除');
                        });

                });
        }

    }
})();