/**
 * Created by harry on 16/6/10.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.doctor.doctor', [
        // 'BlurAdmin.cms.doctorEdit'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('doctor.doctor', {
                url: '/doctor',
                templateUrl: 'app/cms/crm/doctor/doctor/doctor.html',
                controller: 'doctorCtrl',
                title: '药师资料',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 10,
                },
            });
    }

})();
