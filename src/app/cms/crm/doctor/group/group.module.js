/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.doctor.group', [])
        .config(routeConfig)
        .config(function(){
        });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('doctor.group', {
                url: '/group',
                templateUrl: 'app/cms/crm/doctor/group/group.html',
                controller: 'groupCtrl',
                title: '用户组',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
