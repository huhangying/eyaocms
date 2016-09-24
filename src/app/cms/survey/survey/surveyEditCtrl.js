/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey.survey')
        .controller('surveyEditCtrl', surveyEditCtrl);

    /** @ngInject */
    function surveyEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.editQ = {options: []};
        $scope.editStatus = 0; // Status: 0:init; 1: create; 2: edit;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveMe = function(item) {

            //validate
            if ($scope.editQForm.$invalid)
                return;
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

toastr.info(JSON.stringify(item))
            //$scope.closeMe();

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
            $scope.editQ.optionNumber = 0;
            $scope.editQ.order = 0;
            $scope.editQ.weight = 0;
        }

        $scope.editQuestion = function(question) {
            $scope.editStatus = 2;
        }

        $scope.changeEditAnswerType = function() {
            switch($scope.editQ.answerType) {
                case '0':
                    $scope.editQ.optionNumber = 2;
                    break;
                case '1':
                case '2':
                    if (!$scope.editQ.optionNumber || $scope.editQ.optionNumber < 3)
                        $scope.editQ.optionNumber = 3;
                    break;
                case '3':
                    $scope.editQ.optionNumber = 1;
                    break;
                default:
                    $scope.editQ.optionNumber = 0;
                    break;
            }
            $scope.changeEditOptionNumber();
        }

        $scope.changeEditOptionNumber = function() {
            var diff = $scope.editQ.optionNumber - $scope.editQ.options.length;
            if (diff > 0) {
                for (var i=0; i<diff; i++) {
                    $scope.editQ.options.push({
                        answer: '',
                        addition_text: false,
                        weight: 0
                    });
                }
            }
            else if (diff < 0) {
                for (var i=0; i<(0-diff); i++) {
                    $scope.editQ.options.pop();
                }
            }
        }
    }
})();