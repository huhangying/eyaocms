(function () {
  'use strict';

  angular.module('BlurAdmin.cms.profile', [])
      .config(routeConfig);

  /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/cms/profile/profile.html',
                controller: 'ProfilePageCtrl',
                title: '个人资料',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 0,
                },
            });
    }

})();
