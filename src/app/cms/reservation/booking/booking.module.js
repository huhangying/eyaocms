/**
 * Created by harry on 16/6/10.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.booking', [
        // 'BlurAdmin.cms.doctorEdit'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reservation.booking', {
                url: '/booking/:schedule',
                templateUrl: 'app/cms/reservation/booking/booking.html',
                controller: 'bookingCtrl',
                title: '预约门诊',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
