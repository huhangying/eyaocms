
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.education.category', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('education.category', {
          url: '/cat/:department',
          templateUrl: 'app/cms/education/category/category.html',
          controller: 'educationCategoryCtrl',
          title: '材料类别',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
