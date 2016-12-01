//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.category')
        .controller('educationCategoryCtrl', educationCategoryCtrl);

    /** @ngInject */
    function educationCategoryCtrl($scope, $state, $filter, $http, $q, util, toastr) {
        $scope.search = {};

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

        $scope.getCats = function(departmentId) {
            $scope.myPromise = $http.get(util.baseApiUrl + 'articlecats', {department: departmentId})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.cats = [];
                    }
                    else {
                        $scope.cats = response;
                    }

                    // set department search/filter
                    $scope.search.department = departmentId;

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getCats($state.params.department);

        $scope.addCat = function() {
            $scope.inserted = {
                department: $scope.search.department || '',
                name: '',
                desc: '',
                apply: true
            };

            $scope.cats.unshift($scope.inserted);
        }

        $scope.removeCat = function(id, index) {

            $http.get(util.baseApiUrl + 'templates/cat/' + id)
                .success(function(response) {
                    var templates = util.getResponse(response);
                    if (templates && templates.length > 0) {
                        toastr.error('不能被删除,请先删除与之关联的问卷调查。');
                    }
                    else {
                        $http.delete(util.baseApiUrl + 'articlecat/' + id)
                            .success(function (response) {
                                $scope.cats = $filter('filter')($scope.cats, {_id: '!'+id});

                                toastr.success('成功删除');
                            })

                    }
                });

        }

        $scope.validate = function(item) {
            if (!item || !item.name){
                toastr.error('名字不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveCat = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'articlecat', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.cats.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.cats.unshift($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.cats.splice(1, 1);

                        data._id = response._id;
                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'articlecat/' + data._id, data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.cats.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        toastr.success('成功创建');
                    });
            }
        };


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

        $scope.getTemplatesByCatId = function(id, departmentId){
            $state.go('education.template', {cat: id, department: departmentId});
        }

    }
})();