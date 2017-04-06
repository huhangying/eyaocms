/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.template')
        .controller('templateEditCtrl', templateEditCtrl);

    /** @ngInject */
    function templateEditCtrl($scope, $rootScope, $http, util, toastr, $timeout) {
        var baseImagePath;
        $scope.obj = {};

        $scope.saveTemplateEdit = function() {

            // update
            $scope.myPromise = $http.patch(util.baseApiUrl + 'template/' + $scope.template._id, $scope.template)
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
                        $scope.$close(response);
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
            $scope.displayedUrl = baseImagePath + $scope.template.title_image;
            $scope.updated = true;
        };
        
        var init = function() {
            $scope.template = angular.copy($scope.editItem);
            $scope.preview = false;
            $scope.updated = false;
            $scope.myPromise = $http.get(util.baseApiUrl + 'department/' + $rootScope.login.department).then(
                function (response) {
                    // check if return null
                    if (response.return && response.return == 'null') {
                        toastr.error(util.error.noData);
                    }
                    else {
                        var assetFolder = '';
                        if (response.data.assetFolder) {
                            assetFolder = response.data.assetFolder + '/';
                        }
                        baseImagePath = util.baseImageServer + assetFolder;
                        if ($scope.obj.flow && $scope.obj.flow.defaults) {
                            $scope.obj.flow.defaults.target = util.baseImageServer + 'upload/' + assetFolder;
                        }

                        if ($scope.template.title_image) {
                            $scope.displayedUrl = baseImagePath + $scope.template.title_image;
                            $scope.updated = true;
                        }
                    }
                },
                function(error){
                    toastr.error(error.messageFormatted);
                });

        };
        init();

        // $scope.flowInit = function () {
        //     toastr.error($scope.obj.flow.defaults.target);
        // };
    }
})();