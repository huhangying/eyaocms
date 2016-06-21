
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.im.chatroom', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('im.chatroom', {
          url: '/chatroom',
          templateUrl: 'app/cms/im/chatroom/chatroom.html',
          controller: 'chatroomCtrl',
          title: '聊天室',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
