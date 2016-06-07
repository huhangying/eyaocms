
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.hospital.disease', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.disease', {
          url: '/disease',
          templateUrl: 'app/pages/hospital/disease/disease.html',
          title: '疾病类型',
          sidebarMeta: {
            order: 300,
          },
        });
  }

})();
