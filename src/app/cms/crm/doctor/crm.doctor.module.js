/**
 * Created by harry on 16/6/9.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.doctor', [
        'BlurAdmin.cms.crm.doctor.doctor',
        'BlurAdmin.cms.crm.doctor.group',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('doctor', {
                url: '/doctor',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '药师管理',
                sidebarMeta: {
                    icon: 'ion-person-stalker',
                    order: 150,
                },
                minRole: 1,
            });
    }

})();