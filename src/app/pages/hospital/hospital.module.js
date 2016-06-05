/**
 * Created by harry on 16/6/5.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.hospital', [
        'BlurAdmin.pages.hospital.department',
        // 'BlurAdmin.pages.hospital.disease',
        // 'BlurAdmin.pages.hospital.symptom',
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
                    icon: 'ion-gear-a',
                    order: 10,
                },
            });
    }

})();
