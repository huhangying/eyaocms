
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.group', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('survey.group', {
          url: '/surveygroup',
          templateUrl: 'app/cms/survey/group/group.html',
          controller: 'surveyGroupCtrl',
          title: '问卷集合',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
