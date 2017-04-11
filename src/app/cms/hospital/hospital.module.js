/**
 * Created by harry on 16/6/5.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital', [
        'BlurAdmin.cms.hospital.department',
        // 'BlurAdmin.cms.hospital.disease',
        // 'BlurAdmin.cms.hospital.symptom',
        'BlurAdmin.cms.hospital.medicine',
        'BlurAdmin.cms.hospital.faq',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('hospital', {
                url: '/hospital',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '医院配置信息',
                sidebarMeta: {
                    icon: 'ion-medkit',
                    order: 300,
                },
                minRole: 1,
            });
    }

})();
