
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.im.chat')
    .controller('chatCtrl', chatCtrl);

  /** @ngInject */
  function chatCtrl($scope, $filter, $http, util, toastr) {

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
      $http.get(util.baseApiUrl + 'chats', {})
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




    $scope.addChat = function() {
      $scope.inserted = {
        chatroom: $scope.search.chatroom || null,
        name: '',
        direction: 0,
        data: ''
      };


      $scope.chats.push($scope.inserted);
    }

    $scope.removeChat = function(id, index) {

      // check if any disease connect to it
      if (!id){
        $scope.chats.splice(index, 1);
        return;
      }

        $http.delete(util.baseApiUrl + 'chat/' + id)
            .success(function (response) {
                $scope.chats.splice(index, 1);
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

    $scope.saveChat = function(data, id, index) {

      //validate
      if (!$scope.validate(data)){
        return;
      }

      if (!data._id) { // create
        $http.post(util.baseApiUrl + 'chat', data)
            .success(function (response) {
              $scope.inserted = response;

              $scope.chats.push($scope.inserted);
              toastr.success('成功创建');

              // remove
              $scope.chats.splice(index + 1, 1);

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
            });
      }

      //$scope.inserted = null;

    }

  }
})();