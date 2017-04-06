/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey.surveyTemplate')
        .controller('surveyTemplateEditCtrl', surveyTemplateEditCtrl);

    /** @ngInject */
    function surveyTemplateEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.questions = angular.copy($scope.editItem.questions || []);
        $scope.editQ = {options: []};
        $scope.editStatus = 0; // Status: 0:init; 1: create; 2: edit;
        $scope.editQIndex = -1;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveQuestion = function(question) {

            //validate
            if ($scope.editQForm.$invalid)
                return;

            switch ($scope.editStatus) {
                case 1: // create
                    $scope.questions.push(angular.copy(question));
                    break;
                case 2: // edit
                    $scope.questions[$scope.editQIndex] = angular.copy(question);
                    break;
                default:
                    break;
            }
            $scope.editStatus = 0;
            $scope.editQIndex = -1;

            // re-sort questions
            $scope.questions = _.sortBy($scope.questions, 'order');

            // clean highlight line
            $scope.highlightIndex = -1;
        }

        $scope.saveSurveyTemplate = function() {

            var template = angular.copy($scope.editItem);
            template.questions = $scope.questions;


            if (template._id) {
                // update
                $http.patch(util.baseApiUrl + 'surveytemplate/' + template._id, template)
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
                            $scope.$close(response);
                        }
                    });
            }
            else {
                // create
                $http.post(util.baseApiUrl + 'surveytemplate', template)
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
                            $scope.$close(response);
                        }
                    });
            }

        }
        
        $scope.closeMe = function(){
            $scope.$dismiss();
        }
        
        $scope.createQuestion = function() {
            $scope.editStatus = 1;
            $scope.editQIndex = -1;
            $scope.highlightIndex = -1;

            // set default
            $scope.editQ._id = undefined;
            $scope.editQ.question = '';
            $scope.editQ.answer_type = -1;
            $scope.editQ.apply = true;
            $scope.editQ.optionNumber = 0;
            $scope.editQ.order = 0;
            $scope.editQ.weight = 0;
            $scope.editQ.required = false;
            $scope.editQ.options = [];
        }

        $scope.editQuestion = function(question, index) {
            $scope.editStatus = 2;
            $scope.editQIndex = index;

            // load question to edit area
            $scope.editQ = angular.copy(question);
            $scope.editQ.answer_type = $scope.editQ.answer_type.toString(); // for select display
            $scope.changeEditAnswerType();

            // highlight the selected question
            $scope.highlightIndex = index;
        }

        $scope.removeQuestion = function(index) {
            $scope.questions.splice(index, 1);
        }

        $scope.changeEditAnswerType = function() {
            var resetAnswers = false;
            switch($scope.editQ.answer_type) {
                case '0':
                    $scope.editQ.optionNumber = 2;
                    resetAnswers = true;
                    break;

                case '1':
                case '2':
                    $scope.editQ.optionNumber = $scope.editQ.options.length || 3;
                    if ($scope.editQ.optionNumber < 2)
                        $scope.editQ.optionNumber = 3;
                    break;
                case '3':
                    $scope.editQ.optionNumber = $scope.editQ.options.length || 1; // default
                    break;
                default:
                    $scope.editQ.optionNumber = 0;
                    break;
            }
            $scope.changeEditOptionNumber(resetAnswers);
        }

        $scope.changeEditOptionNumber = function(resetAnswers) {
            var diff = $scope.editQ.optionNumber - $scope.editQ.options.length;
            if (diff > 0) {
                if ($scope.editQ.answer_type == 0){ // 如果是是非题,预设答案
                    $scope.editQ.options = [];
                    $scope.editQ.options.push({
                        answer: '是',
                        addition_text: false,
                        weight: 0
                    });
                    $scope.editQ.options.push({
                        answer: '否',
                        addition_text: false,
                        weight: 0
                    });
                }
                else {
                    if (resetAnswers) {
                        $scope.editQ.options = [];
                        for (var i=0; i<$scope.editQ.optionNumber; i++) {
                            $scope.editQ.options.push({
                                answer: '',
                                addition_text: false,
                                weight: 0
                            });
                        }
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

            }
            else if (diff < 0) {
                for (var i=0; i<(0-diff); i++) {
                    $scope.editQ.options.pop();
                }
            }
        }
    }
})();