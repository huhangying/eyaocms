
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.department', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.department', {
          url: '/department',
          templateUrl: 'app/cms/hospital/department/department.html',
          controller: 'departmentCtrl',
          title: '医院科室',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
