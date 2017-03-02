
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.wechat.keyword', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('wechat.keyword', {
          url: '/keyword',
          templateUrl: 'app/cms/wechat/keyword.html',
          controller: 'keywordCtrl',
          title: '文章关键字搜索',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
