/**
 * Created by harry on 16/6/10.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.doctor', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('doctor', {
                url: '/doctor',
                templateUrl: 'app/cms/doctor/doctor.html',
                controller: 'DoctorCtrl',
                title: '医生资料',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
