

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.report.assessment', [])
        .config(routeConfig)
        .config(function(){
        });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('report.assessment', {
                url: '/report/assessment/:doctor',
                templateUrl: 'app/cms/report/assessment/assessment.html',
                controller: 'assessmentCtrl',
                title: '药师评价',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
