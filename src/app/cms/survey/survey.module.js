/**
 * Created by harry on 16/6/18.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey', [
        //'BlurAdmin.cms.survey.category',
        //'BlurAdmin.cms.survey.group',
        'BlurAdmin.cms.survey.surveyTemplate',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('survey', {
                url: '/survey',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: '问卷模版管理',
                sidebarMeta: {
                    icon: 'ion-calendar',
                    order: 1000,
                },
                minRole: 1,
            });
    }

})();
