/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.relationship', [])
        .config(routeConfig)
        .config(function(){
        });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('crm.relationship', {
                url: '/relationship',
                templateUrl: 'app/cms/crm/relationship/relationship.html',
                controller: 'relationshipCtrl',
                title: '医患关系',
                sidebarMeta: {
                    icon: 'ion-ios-person',
                    order: 50,
                },
            });
    }

})();
