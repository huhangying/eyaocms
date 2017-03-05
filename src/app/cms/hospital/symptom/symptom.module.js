
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.symptom', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.symptom', {
          url: '/symptom',
          templateUrl: 'app/cms/hospital/symptom/symptom.html',
          title: '症状',
          controller: 'symptomCtrl',
          sidebarMeta: {
            order: 400,
          },
            minRole: 2,
        });
  }

})();
