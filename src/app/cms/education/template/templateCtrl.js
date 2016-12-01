//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.education.template')
        .controller('templateCtrl', templateCtrl);

    /** @ngInject */
    function templateCtrl($scope, $state, $filter, $http, util, toastr, $uibModal) {
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

            $scope.showDepartment= function(item) {
                if(item.department && $scope.departments.length) {
                    var selected = $filter('filter')($scope.departments, {_id: item.department});
                    return selected.length ? selected[0].name : '未设置';
                } else {
                    return '未设置';
                }
            };

            $scope.cats = [];
            $scope.loadTemplateCats = function() {
                $http.get(util.baseApiUrl + 'articlecats', {})
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
            $scope.loadTemplateCats();

            $scope.showCat= function(item) {
                if(item.cat && $scope.cats.length) {
                    var selected = $filter('filter')($scope.cats, {_id: item.cat});
                    return selected.length ? selected[0].name : '未设置';
                } else {
                    return '未设置';
                }
            };

        }

        init();

        // set pre-set values (department & cat)
        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.cat && $state.params.department) {
                $scope.search.department = $state.params.department;
                $scope.search.cat = $state.params.cat;
            }
            else {
                // list all
            }
        });



        //===========================================================

        $scope.templates = [];

        $scope.getTemplates = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'templates/cat/' + $state.params.cat)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.templates = [];
                    }
                    else {
                        $scope.templates = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        if ($state.params.cat){
            $scope.getTemplates();
        }


        $scope.addTemplate = function() {
            $scope.inserted = {

                department: $scope.search.department,
                cat: $scope.search.cat,
                name: '',
                title: '',
                title_image: '',
                updatedBy: util.getLoginUserId(),
                apply: true
            };

            $scope.templates.unshift($scope.inserted);
            //toastr.info($scope.templates[0] == $scope.inserted)
        }

        $scope.removeTemplate = function(id, index) {

            $http.delete(util.baseApiUrl + 'template/' + id)
                .success(function (response) {
                    $scope.templates = $filter('filter')($scope.templates, {_id: '!'+id});

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

        $scope.saveTemplate = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'template', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.templates.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.templates.unshift($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.templates.splice(1, 1);

                        data._id = response._id;
                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'template/' + id, data)
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

        $scope.cancelTemplate = function() {
            // remove items without _id
            if ($scope.templates && $scope.templates.length > 0) {
                $scope.templates.map(function(template) {
                    return !template._id;
                });
            }
        };

        $scope.open = function (template, size, item, index) {
            $scope.editItem = item; // pass item into the edit template
            $scope.editIndex = index;
            $uibModal.open({
                animation: true,
                templateUrl: template,
                controller: 'templateEditCtrl',
                size: size,
                scope: $scope,
                backdrop: 'static'
                // resolve: {
                //     item: function () {
                //         return item;
                //     }
                // }
            });
        };
        
        $scope.updateParent = function (updatedItem) {
            $scope.templates[$scope.editIndex] = updatedItem;
        }

        //================================

        $scope.backToCats = function () {
            $state.go('education.category', {department: $state.params.department});
        }
    }
})();