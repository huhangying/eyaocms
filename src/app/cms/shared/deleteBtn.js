/**
 * Created by harry on 16/11/23.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.shared.deleteBtn', [])

        .directive('deleteBtn', function() {
            return {
                restrict: 'AE',
                transclude: true,
                scope: {
                    yesDelete: '=',
                    itemId: '=',
                    userId: '=?'
                    //removeCat: '&'

                },
                controller: ['$scope', '$uibModal', function($scope, $uibModal)  {
                    //var panes = $scope.panes = [];

                    $scope.open = function() {

                        $uibModal.open({
                            animation: true,
                            templateUrl: './app/cms/shared/deleteConfirm.html',
                            controller: 'deleteConfirmCtrl',
                            size: 'sm',
                            scope: $scope
                            // resolve: {
                            //     item: function () {
                            //         return item;
                            //     }
                            // }
                        });
                    }

                }],
                template: '<button class="btn btn-danger btn-xs" ng-click="open()"><i class="ion-ios-trash"></i></button>'
            };
        });
})();