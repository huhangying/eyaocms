/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.template')
        .controller('templateEditCtrl', templateEditCtrl);

    /** @ngInject */
    function templateEditCtrl($scope, $filter, $http, util, toastr) {
        $scope.preview = false;

        $scope.saveTemplate = function() {

            var template = angular.copy($scope.editItem);

            // update
            $http.patch(util.baseApiUrl + 'template/' + template._id, template)
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