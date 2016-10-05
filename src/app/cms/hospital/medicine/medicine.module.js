
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.medicine', [])
    .config(routeConfig)
    .config(function(){
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('hospital.medicine', {
          url: '/medicine',
          templateUrl: 'app/cms/hospital/medicine/medicine.html',
          controller: 'medicineCtrl',
          title: '药品管理',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
