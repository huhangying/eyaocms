
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.faq', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.faq', {
          url: '/faq',
          templateUrl: 'app/cms/hospital/faq/faq.html',
          title: '常问问题管理',
          controller: 'faqCtrl',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();
