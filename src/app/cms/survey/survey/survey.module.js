
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.survey', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('survey.survey', {
          url: '/survey',
          templateUrl: 'app/cms/survey/survey/survey.html',
          controller: 'surveyCtrl',
          title: '问卷试题',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
