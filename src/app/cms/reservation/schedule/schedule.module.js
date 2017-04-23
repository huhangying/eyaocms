/**
 * Created by harry on 16/6/10.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule', [
        // 'BlurAdmin.cms.doctorEdit'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reservation.schedule', {
                url: '/schedule',
                templateUrl: 'app/cms/reservation/schedule/schedule.html',
                controller: 'scheduleCtrl',
                title: '门诊开通',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 10,
                },
            });
    }

})();
