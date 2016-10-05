/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital.medicine')
        .controller('medicineEditCtrl', medicineEditCtrl);

    /** @ngInject */
    function medicineEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.questions = angular.copy($scope.editItem.questions || []);
        $scope.editQ = {options: []};
        $scope.editStatus = 0; // Status: 0:init; 1: create; 2: edit;
        $scope.editQIndex = -1;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveQuestion = function(index) {

            //validate
            if ($scope.editQForm.$invalid)
                return;

            switch ($scope.editStatus) {
                case 1: // create
                    $scope.questions.push(angular.copy($scope.editQ));
                    break;
                case 2: // edit
                    $scope.questions[$scope.editQIndex] = angular.copy($scope.editQ);
                    break;
                default:
                    break;
            }
            $scope.editStatus = 0;
            $scope.editQIndex = -1;
            //toastr.info(JSON.stringify(item))
        }

        $scope.saveSurvey = function() {

            var survey = angular.copy($scope.editItem);
            survey.questions = $scope.questions;


            // update
            $http.patch(util.baseApiUrl + 'survey/' + survey._id, survey)
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
        }
        
        $scope.createQuestion = function() {
            $scope.editStatus = 1;
            $scope.editQIndex = -1;

            // set default
            $scope.editQ._id = undefined;
            $scope.editQ.question = '';
            $scope.editQ.answer_type = -1;
            $scope.editQ.apply = true;
            $scope.editQ.optionNumber = 0;
            $scope.editQ.order = 0;
            $scope.editQ.weight = 0;
            $scope.editQ.required = false;
        }

        $scope.editQuestion = function(question, index) {
            $scope.editStatus = 2;
            $scope.editQIndex = index;

            // load question to edit area
            $scope.editQ = angular.copy(question);
            $scope.editQ.answer_type = $scope.editQ.answer_type.toString(); // for select display
            $scope.changeEditAnswerType();
        }

        $scope.removeQuestion = function(index) {
            $scope.questions.splice(index, 1);
        }

        $scope.changeEditAnswerType = function() {
            switch($scope.editQ.answer_type) {
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
                if ($scope.editQ.answer_type == 0){ // 如果是是非题,预设答案
                    $scope.editQ.options.push({
                        answer: '是',
                        addition_text: false,
                        weight: 0
                    });
                    $scope.editQ.options.push({
                        answer: '不是',
                        addition_text: false,
                        weight: 0
                    });
                }
                else {
                    for (var i=0; i<diff; i++) {
                        $scope.editQ.options.push({
                            answer: '',
                            addition_text: false,
                            weight: 0
                        });
                    }
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