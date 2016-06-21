
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.disease', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.disease', {
          url: '/disease/:department',
          templateUrl: 'app/cms/hospital/disease/disease.html',
          title: '疾病类型',
          controller: 'diseaseCtrl',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
