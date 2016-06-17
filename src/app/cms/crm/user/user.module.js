/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.user', [])
        .config(routeConfig)
        .config(function(){
        });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('crm.user', {
                url: '/user',
                templateUrl: 'app/cms/crm/user/user.html',
                controller: 'userCtrl',
                title: '病患资料',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
