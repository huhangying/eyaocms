
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.system.const', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('system.const', {
          url: '/const',
          templateUrl: 'app/cms/system/const.html',
          controller: 'constCtrl',
          title: '全局定义',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
