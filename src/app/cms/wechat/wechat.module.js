/**
 * Created by harry on 16/6/5.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.wechat', [
        'BlurAdmin.cms.wechat.keyword',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('wechat', {
                url: '/wechat',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '微信配置',
                sidebarMeta: {
                    icon: 'ion-social-codepen-outline',
                    order: 900,
                },
                minRole: 1,
            });
    }

})();
