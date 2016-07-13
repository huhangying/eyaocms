/**
 * Created by harry on 16/6/5.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.system', [
        'BlurAdmin.cms.system.const',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('system', {
                url: '/system',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '系统配置',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 100,
                },
                minRole: 2,
            });
    }

})();
