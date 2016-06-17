/**
 * Created by harry on 16/6/9.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm', [
        'BlurAdmin.cms.crm.user',
        // 'BlurAdmin.cms.crm.group',
        // 'BlurAdmin.cms.crm.relationship',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('crm', {
                url: '/crm',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '用户关系管理',
                sidebarMeta: {
                    icon: 'ion-ios-people',
                    order: 200,
                },
            });
    }

})();