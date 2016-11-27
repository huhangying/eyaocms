/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.page')
        .controller('pageEditCtrl', pageEditCtrl);

    /** @ngInject */
    function pageEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.preview = false;

        $scope.savePage = function() {

            var page = angular.copy($scope.editItem);

            // update
            $http.patch(util.baseApiUrl + 'page/' + page._id, page)
                .success(function (response) {
                    //console.log(JSON.stringify(response))
                    if (!response ){
                        toastr.error('错误')
                    }
                    else if (response.return == 'error') {
                        toastr.error(response.message);
                    }
                    else{
                        toastr.success('成功更新');
                        $scope.editItem = response;
                        $scope.updateParent($scope.editItem);
                        $scope.closeMe();
                    }
                });
        }
        
        $scope.closeMe = function(){
            $scope.$dismiss();
        };

        $scope.textAreaSetup = function($element){
            $element.attr('ui-codemirror', '');
        };

        $scope.previewToggle = function() {
            $scope.preview = !$scope.preview;
        };

    }
})();