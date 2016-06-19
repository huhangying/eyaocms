/**
 * Created by harry on 16/6/18.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation', [
        'BlurAdmin.cms.reservation.schedule',
        // 'BlurAdmin.cms.im.disease',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reservation', {
                url: '/reservation',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '预约管理',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 600,
                },
            });
    }

})();
