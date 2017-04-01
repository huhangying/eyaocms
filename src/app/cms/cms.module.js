/**
 * Created by hhu on 2016/6/4.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms', [
            'ui.router',

         //   'BlurAdmin.cms.user',
        'BlurAdmin.cms.profile',
        'BlurAdmin.cms.crm.doctor',
        'BlurAdmin.cms.crm',
        'BlurAdmin.cms.hospital',
        'BlurAdmin.cms.reservation',
        'BlurAdmin.cms.im',
        'BlurAdmin.cms.system',
        'BlurAdmin.cms.survey',
        'BlurAdmin.cms.education',
        'BlurAdmin.cms.wechat',
        'BlurAdmin.cms.report'

        ])
        .config(routeConfig)

        .directive('windowResize', ['$window', '$rootScope', function($window, $rootScope){
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    scope.onResize = function() {
                        $rootScope.frameHeight = $window.innerHeight -188;
                    }
                    scope.onResize();

                    angular.element($window).bind('resize', function() {
                        scope.onResize();
                    });
                }
            }}])

        // 使用 lodash: allow DI for use in controllers
        .constant('_', window._)
        .run(function ($rootScope) {
            $rootScope._ = window._;
        });

    /** @ngInject */
    function routeConfig($urlRouterProvider, $sceDelegateProvider, $provide) {
        $urlRouterProvider.otherwise('/profile/');

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://*/**',
            'https://*/**',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://116.62.29.222/**',
            'http://zys.rostensoft.com/**',
            'http://yyl.rostensoft.com/**'
        ]);

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Pages',
        //     icon: 'ion-document',
        //     subMenu: [{
        //         title: '登陆',
        //         fixedHref: 'auth.html',
        //         blank: true
        //     }, {
        //         title: '注册',
        //         fixedHref: 'reg.html',
        //         blank: true
        //     }, {
        //         title: '用户 Profile',
        //         stateRef: 'profile'
        //     }, {
        //         title: '404 页面',
        //         fixedHref: '404.html',
        //         blank: true
        //     }]
        // });

        // $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$modal',
        //     function (taRegisterTool, taOptions, $modal) {
        //         taRegisterTool('uploadImage', {
        //             buttontext: '上传图片',
        //             iconclass: "fa fa-image",
        //             action: function (deferred,restoreSelection) {
        //                 $modal.open({
        //                     controller: 'UploadImageModalInstance',
        //                     templateUrl: 'views/modals/upload.html'
        //                 }).result.then(
        //                     function (result) {
        //                         restoreSelection();
        //                         document.execCommand('insertImage', true, result);
        //                         deferred.resolve();
        //                     },
        //                     function () {
        //                         deferred.resolve();
        //                     }
        //                 );
        //                 return false;
        //             }
        //         });
        //         taOptions.toolbar[1].push('uploadImage');
        //         return taOptions;
        // }]);

        // $provide.decorator('taOptions', ['taRegisterTool', '$modal', '$delegate',
        //     function(taRegisterTool, $modal, taOptions) {
        //         // $delegate is the taOptions we are decorating
        //         // here we override the default toolbars specified in taOptions.
        //         taOptions.toolbar = [
        //             ['clear', 'h1', 'h2', 'h3'],
        //             ['ul', 'ol'],
        //             ['bold', 'italics'],
        //             ['insertLink', 'insertVideo']
        //         ];
        //
        //         // Create our own insertImage button
        //         taRegisterTool('customInsertImage', {
        //             iconclass: "fa fa-picture-o",
        //             action: function() {
        //                 var textAngular = this;
        //                 var savedSelection = rangy.saveSelection();
        //                 var modalInstance = $modal.open({
        //                     // Put a link to your template here or whatever
        //                     template: '<label>Enter the url to your image:</label><input type="text" ng-model="img.url"><button ng-click="submit()">OK</button>',
        //                     size: 'sm',
        //                     controller: ['$modalInstance', '$scope',
        //                         function($modalInstance, $scope) {
        //                             $scope.img = {
        //                                 url: ''
        //                             };
        //                             $scope.submit = function() {
        //                                 $modalInstance.close($scope.img.url);
        //                             };
        //                         }
        //                     ]
        //                 });
        //
        //                 modalInstance.result.then(function(imgUrl) {
        //                     rangy.restoreSelection(savedSelection);
        //                     textAngular.$editor().wrapSelection('insertImage', imgUrl);
        //                 });
        //                 return false;
        //             },
        //         });
        //
        //         // Now add the button to the default toolbar definition
        //         // Note: It'll be the last button
        //         taOptions.toolbar[3].push('customInsertImage');
        //         return taOptions;
        //     }
        // ]);
    }

})();
