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
            $scope.loadPageCats = function() {
                $http.get(util.baseApiUrl + 'pagecats', {})
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
            $scope.loadPageCats();

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

        $scope.pages = [];

        $scope.getPages = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'pages/cat/' + $state.params.cat)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.pages = [];
                    }
                    else {
                        $scope.pages = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        if ($state.params.cat){
            $scope.getPages();
        }


        $scope.addPage = function() {
            $scope.inserted = {

                department: $scope.search.department,
                cat: $scope.search.cat,
                name: '',
                title: '',
                title_image: '',
                apply: true
            };

            $scope.pages.push($scope.inserted);
            //toastr.info($scope.pages[0] == $scope.inserted)
        }

        $scope.removePage = function(id, index) {

            $http.delete(util.baseApiUrl + 'page/' + id)
                .success(function (response) {
                    $scope.pages = $filter('filter')($scope.pages, {_id: '!'+id});

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

        $scope.savePage = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'page', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.pages.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.pages.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.pages.splice($scope.pages.length - 1, 1);

                        data._id = response._id;
                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'page/' + id, data)
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

        $scope.cancelPage = function() {
            // remove items without _id
            if ($scope.pages && $scope.pages.length > 0) {
                $scope.pages.map(function(page) {
                    return !page._id;
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
            $scope.pages[$scope.editIndex] = updatedItem;
        }

        //================================

        $scope.backToCats = function () {
            $state.go('education.category', {department: $state.params.department});
        }
    }
})();