/**
 * Created by hhu on 2016/6/4.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms', [
            'ui.router',

         //   'BlurAdmin.cms.user',
        'BlurAdmin.cms.profile',
        'BlurAdmin.cms.crm.doctor',
        'BlurAdmin.cms.crm',
        'BlurAdmin.cms.hospital',
        'BlurAdmin.cms.reservation',
        'BlurAdmin.cms.im',
        'BlurAdmin.cms.system',
        'BlurAdmin.cms.survey'

        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/profile/');

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Pages',
        //     icon: 'ion-document',
        //     subMenu: [{
        //         title: '登陆',
        //         fixedHref: 'auth.html',
        //         blank: true
        //     }, {
        //         title: '注册',
        //         fixedHref: 'reg.html',
        //         blank: true
        //     }, {
        //         title: '用户 Profile',
        //         stateRef: 'profile'
        //     }, {
        //         title: '404 页面',
        //         fixedHref: '404.html',
        //         blank: true
        //     }]
        // });

    }

})();
