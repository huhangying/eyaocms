(function () {
  'use strict';

  angular.module('BlurAdmin.cms.profile', ['flow'])
      .config(routeConfig)
      .config(['flowFactoryProvider', function (flowFactoryProvider) {
          flowFactoryProvider.defaults = {
              target: '/public/images/doctor',
              permanentErrors:[404, 500, 501]
          };
      }]);
  /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile/:doctor',
                templateUrl: 'app/cms/profile/profile.html',
                controller: 'ProfilePageCtrl',
                title: '个人资料',
                sidebarMeta: {
                    icon: 'ion-android-contact',
                    order: 0,
                },
                minRole: 0,
            });
    }

})();
