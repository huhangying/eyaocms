/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.template')
        .controller('templateEditCtrl', templateEditCtrl);

    /** @ngInject */
    function templateEditCtrl($scope, $filter, $http, util, toastr) {
        $scope.template = angular.copy($scope.editItem);
        $scope.preview = false;
        $scope.updated = false;
        if ($scope.template.title_image) {
            $scope.displayedUrl = util.baseImageServer + $scope.template.title_image;
            $scope.updated = true;
        }

        $scope.saveTemplate = function() {

            // update
            $http.patch(util.baseApiUrl + 'template/' + $scope.template._id, $scope.template)
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
                        $scope.template = response;
                        $scope.updateParent($scope.template);
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

        $scope.uploadedImg = function() {
            $scope.displayedUrl = util.baseApiUrl + $scope.template.title_image;
            $scope.updated = true;
        };
    }
})();