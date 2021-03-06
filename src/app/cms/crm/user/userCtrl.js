/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.user')
        .controller('userCtrl', userCtrl);

    /** @ngInject */
    function userCtrl($scope, $rootScope, $filter, $http, util, toastr, $uibModal) {

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

        $scope.showDepartment = function(item) {
            if(item.department && $scope.departments.length) {
                var selected = $filter('filter')($scope.departments, {_id: item.department});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };


        $scope.users = [];
        $scope.getUsers = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'users/1000', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.users = [];
                    }
                    else {
                        $scope.users = response;
                    }
                    // get filtered users
                    $scope.getFilteredUsers();
                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getUsers();

        $scope.filteredUsers = [];
        $scope.getFilteredUsers = function(search) {
            $scope.filteredUsers =
                $scope.users.filter(function(user) {
                    if (!search || (!search.cell && !search.name)) {
                        return true;
                    }
                    if ((search.cell && user.cell && user.cell.includes(search.cell) ) ||
                        (search.name && user.name && user.name.includes(search.name) ) ) {
                        return true;
                    }
                });
            //console.log($scope.filteredUsers);
        };

        $scope.addUser = function() {
            $scope.inserted = {
                link_id: '',
                name: '',
                cell: '',
                created: null,
                updated: null,
                apply: true
            };


            $scope.users.push($scope.inserted);
        }

        $scope.removeUser = function(id) {

            $http.delete(util.baseApiUrl + 'admin/userdata/' + id)
                .success(function (response) {
                    $scope.users = $filter('filter')($scope.users, {_id: '!' + id});
                    toastr.info('已删除用户及其相关的数据!');
                    $scope.filteredUsers = angular.copy($scope.users);
                })

                .error(function(err){
                    toastr.error(err.messageFormatted)
                });

        }

        $scope.validate = function(item) {
            if (!item){
                return false;
            }
            if (!item.link_id){
                toastr.error('Link ID 不能为空!');
                return false;
            }
            if (!item.name){
                toastr.error('名字不能为空!');
                return false;
            }
            if (!item.cell){
                toastr.error('手机不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveUser = function(data) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                data.password = data.cell;
                $http.post(util.baseApiUrl + 'user/wechat/' + data.link_id, data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.users.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };
                        $scope.inserted = response;

                        $scope.users.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.users.splice($scope.users.length - 1, 1);

                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'user/wechat/' + data.link_id, data)
                    .success(function (response) {
                        console.log(JSON.stringify(response))
                        if (!response) {
                            toastr.error(error.messageFormatted);
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    });
            }

            //$scope.inserted = null;

        }

        $scope.open = function (page, size, item) {
            $rootScope.myUser = item; // pass item into the edit page
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'userEditCtrl',
                size: size,
                // resolve: {
                //     item: function () {
                //         return item;
                //     }
                // }
            });
        };
    }
})();