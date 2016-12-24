//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey.survey')
        .controller('surveyCtrl', surveyCtrl);

    /** @ngInject */
    function surveyCtrl($scope,$rootScope, $state, $filter, $http, util, toastr, $uibModal) {
        $scope.search = {};

        // get department name and cat name
        var init = function () {

            $scope.departments = [];
            $scope.loadDepartments = function() {
                $http.get(util.baseApiUrl + 'departments', {})
                    .success(function (response) {
                        // check if return null
                        if (response.return && response.return == 'null'){
                            $scope.departments = [];
                        }
                        else {
                            $scope.departments = response;
                        }

                    })
                    .error(function(error){
                        toastr.error(error.messageFormatted);
                    });
            }
            $scope.loadDepartments();

            if ($state.params.department) {
                $scope.search = {
                    department: $state.params.department
                };
            }

            $scope.types = util.surveyTypes;

            if ($state.params.type) {
                $scope.search.type = parseInt($state.params.type, 10);
            }

        }
        init();

        $scope.surveys = [];

        $scope.selectDepartment = function() {
            //loadSurveyTemplates();
        };

        $scope.selectType = function() {
            //loadSurveyTemplates();
        };

        var loadSurveyTemplates = function(newValue, oldValue) {
            if (!$scope.search.department || !$scope.search.type) {
                $scope.surveys = [];
                return;
            };

            $scope.myPromise = $http.get(util.baseApiUrl + 'surveytemplates/' + $scope.search.department + '/type/' + $scope.search.type)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.surveys = [];
                    }
                    else {
                        $scope.surveys = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.$watch('search.type', loadSurveyTemplates);
        $scope.$watch('search.department', loadSurveyTemplates);

        $scope.showQuestions = function(questions) {
            var qs = '';
            if (questions && questions.length > 0) {
                questions = _.sortBy(questions, 'order');
                for (var i=0; i<questions.length; i++){
                    qs += questions[i].order + '. ' + questions[i].question + '\n';
                }
            }
            return qs;
        }

        $scope.addSurveyTemplate = function() {
            $scope.inserted = {
                name: '',
                department: $scope.search.department,
                type: $scope.search.type,
                //desc: '',
                questions: [],
                apply: true
            };


            $scope.surveys.push($scope.inserted);
        }

        $scope.removeSurvey = function(id, index) {

            $http.delete(util.baseApiUrl + 'surveytemplate/' + id)
                .success(function (response) {
                    $scope.surveys = $filter('filter')($scope.surveys, {_id: '!'+id});

                    toastr.success('成功删除');
                });
        }

        $scope.validate = function(item) {
            if (!item || !item.name){
                toastr.error('名字不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveSurvey = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'surveytemplate', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.surveys.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.surveys.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.surveys.splice($scope.surveys.length - 1, 1);

                        data._id = response._id;
                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'surveytemplate/' + id, data)
                    .success(function (response) {
                        //console.log(JSON.stringify(response))
                        if (!response) {
                            toastr.error(error.messageFormatted);
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    });
            }

        };

        //todo: not working!!!
        $scope.cancelSurvey = function() {
            if ($scope.surveys && $scope.surveys.length > 0) {
                $scope.surveys.map(function(survey) {
                    return (survey._id !== undefined);
                });
            }
        };

        $scope.open = function (page, size, item, index) {
            $scope.editItem = item; // pass item into the edit page
            $scope.editIndex = index;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'surveyEditCtrl',
                size: size,
                scope: $scope
                // resolve: {
                //     item: function () {
                //         return item;
                //     }
                // }
            });
        };
        
        $scope.updateParent = function (updatedItem) {
            $scope.surveys[$scope.editIndex] = updatedItem;
        }

        //================================

        $scope.backToCats = function () {
            $state.go('survey.category', {department: $state.params.department});
        }
    }
})();