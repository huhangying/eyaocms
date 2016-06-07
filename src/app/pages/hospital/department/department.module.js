
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.hospital.department', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.department', {
          url: '/department',
          templateUrl: 'app/pages/hospital/department/department.html',
          controller: 'departmentCtrl',
          title: '医院科室',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
