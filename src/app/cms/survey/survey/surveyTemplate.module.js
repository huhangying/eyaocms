
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.surveyTemplate', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('survey.surveyTemplate', {
          url: '/surveytemplate',
          templateUrl: 'app/cms/survey/survey/surveyTemplate.html',
          controller: 'surveyTemplateCtrl',
          title: '问卷模版',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
