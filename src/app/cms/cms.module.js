/**
 * Created by hhu on 2016/6/4.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms', [
            'ui.router',

            'BlurAdmin.cms.user',

        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        baSidebarServiceProvider.addStaticItem({
            title: 'Pages',
            icon: 'ion-document',
            subMenu: [{
                title: '登陆',
                fixedHref: 'auth.html',
                blank: true
            }, {
                title: '注册',
                fixedHref: 'reg.html',
                blank: true
            }, {
                title: '用户 Profile',
                stateRef: 'profile'
            }, {
                title: '404 页面',
                fixedHref: '404.html',
                blank: true
            }]
        });

    }

})();