/**
 * Created by harry on 16/6/18.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education', [
        'BlurAdmin.cms.education.category',
        'BlurAdmin.cms.education.page',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('education', {
                url: '/education',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '宣教材料管理',
                sidebarMeta: {
                    icon: 'ion-calendar',
                    order: 1001,
                },
                minRole: 1,
            });
    }

})();
