
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.education.page', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('education.page', {
          url: '/page/:department/:cat',
          templateUrl: 'app/cms/education/page/page.html',
          controller: 'pageCtrl',
          title: '宣教材料',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
