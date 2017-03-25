/**
 * Created by harry on 16/6/9.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.report', [
        'BlurAdmin.cms.report.assessment',
        // 'BlurAdmin.cms.crm.relationship',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('report', {
                url: '/report',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '统计报表',
                sidebarMeta: {
                    icon: 'ion-ios-pie',
                    order: 900,
                },
                minRole: 1,
            });
    }

})();