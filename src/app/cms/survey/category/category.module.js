
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.category', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('survey.category', {
          url: '/surveycat',
          templateUrl: 'app/cms/survey/category/category.html',
          controller: 'surveyCategoryCtrl',
          title: '问卷类别',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
