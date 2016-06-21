/**
 * Created by harry on 16/6/18.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.im', [
        'BlurAdmin.cms.im.chatroom',
        'BlurAdmin.cms.im.chat',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('im', {
                url: '/im',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '聊天管理',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 800,
                },
            });
    }

})();
