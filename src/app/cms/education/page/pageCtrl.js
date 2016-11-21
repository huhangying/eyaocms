//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.page')
        .controller('pageCtrl', pageCtrl);

    /** @ngInject */
    function pageCtrl($scope,$rootScope, $state, $filter, $http, util, toastr, $uibModal) {
        $scope.search = {};

        // get department name and cat name
        var init = function () {
            $http.get(util.baseApiUrl + 'department/' + $state.params.department)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.department = null;
                    }
                    else {
                        $scope.department = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });

            $http.get(util.baseApiUrl + 'surveycat/' + $state.params.cat)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.cat = null;
                    }
                    else {
                        $scope.cat = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }
        init();
/*
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
        $scope.showDepartment= function(item) {
            if(item.department && $scope.departments.length) {
                var selected = $filter('filter')($scope.departments, {_id: item.department});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };

        $scope.cats = [];
        $scope.loadCats = function() {
            $http.get(util.baseApiUrl + 'surveycats', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.cats = [];
                    }
                    else {
                        $scope.cats = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }
        $scope.loadCats();

        $scope.showCat= function(item) {
            if(item.cat && $scope.cats.length) {
                var selected = $filter('filter')($scope.cats, {_id: item.cat});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };
*/

        $scope.surveys = [];

        $scope.getSurveys = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'surveys/cat/' + $state.params.cat)
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

        $scope.getSurveys();

        $scope.showQuestions = function(questions) {
            var qs = '';
            if (questions && questions.length > 0) {
                for (var i=0; i<questions.length; i++){
                    qs += questions[i].order + '. ' + questions[i].question + '\n';
                }
            }
            return qs;
        }

        $scope.addSurvey = function() {
            $scope.inserted = {
                name: '',
                department: $state.params.department,
                cat: $state.params.cat,
                //desc: '',
                surveys: [],
                apply: true
            };


            $scope.surveys.push($scope.inserted);
        }

        $scope.removeSurvey = function(id, index) {

            $http.delete(util.baseApiUrl + 'survey/' + id)
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
                $http.post(util.baseApiUrl + 'survey', data)
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
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'survey/' + id, data)
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

        }

        $scope.cancelCat = function() {
            // remove items without _id
            if ($scope.cats && $scope.cats.length > 0) {
                $scope.cats.forEach(function(cat, index) {
                    if (!cat._id) {
                        $scope.cats.splice(index, 1);
                    }
                });
            }
        };

        $scope.open = function (page, size, item, index) {
            $scope.editItem = item; // pass item into the edit page
            $scope.editIndex = index;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'pageEditCtrl',
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