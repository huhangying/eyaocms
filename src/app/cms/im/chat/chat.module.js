
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.im.chat', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('im.chat', {
          url: '/chat/:chatroom',
          templateUrl: 'app/cms/im/chat/chat.html',
          title: '聊天内容',
          controller: 'chatCtrl',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
