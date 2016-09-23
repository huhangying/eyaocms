/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey.survey')
        .controller('surveyEditCtrl', surveyEditCtrl);

    /** @ngInject */
    function surveyEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.data = $rootScope.myUser;
        $scope.editQ = {};
        //$scope.editStatus = 0; // Status: 0:init; 1: create; 2: edit;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveMe = function(item) {

            //validate

            // update
            // $http.patch(util.baseApiUrl + 'user/wechat/' + item.link_id, item)
            //     .success(function (response) {
            //         console.log(JSON.stringify(response))
            //         if (!response) {
            //             toastr.error(error.messageFormatted);
            //         }
            //         else{
            //             toastr.success('成功更新');
            //         }
            //     });


            $scope.closeMe();

        }

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $rootScope.myUser = null;
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
        
        $scope.createQuestion = function() {
            $scope.editStatus = 1;

            // set default
            $scope.editQ.apply = true;
            $scope.editQ.optionNumber = 3;
        }

        $scope.editQuestion = function(question) {
            $scope.editStatus = 2;
        }

    }
})();