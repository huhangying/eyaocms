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
        'BlurAdmin.cms.survey',
        'BlurAdmin.cms.education',
        'BlurAdmin.cms.wechat'

        ])
        .config(routeConfig)

        .directive('windowResize', ['$window', '$rootScope', function($window, $rootScope){
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    scope.onResize = function() {
                        $rootScope.frameHeight = $window.innerHeight -188;
                    }
                    scope.onResize();

                    angular.element($window).bind('resize', function() {
                        scope.onResize();
                    });
                }
            }}])

        // 使用 lodash: allow DI for use in controllers
        .constant('_', window._)
        .run(function ($rootScope) {
            $rootScope._ = window._;
        });

    /** @ngInject */
    function routeConfig($urlRouterProvider, $sceDelegateProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/profile/');

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://*/**',
            'https://*/**',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://116.62.29.222/**',
            'http://zys.rostensoft.com/**'
        ]);

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
