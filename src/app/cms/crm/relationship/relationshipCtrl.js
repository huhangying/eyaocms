/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.relationship')
        .controller('relationshipCtrl', relationshipCtrl);

    /** @ngInject */
    function relationshipCtrl($scope, $rootScope, $filter, $http, util, toastr, $uibModal) {

        $scope.groups = [];
        $scope.loadGroups = function() {
            $http.get(util.baseApiUrl + 'groups', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.groups = [];
                    }
                    else {
                        $scope.groups = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }
        $scope.loadGroups();

        $scope.showGroup = function(item) {
            if(item.group && $scope.groups.length) {
                var selected = $filter('filter')($scope.groups, {_id: item.group});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };


        $scope.users = [];
        $scope.loadUsers = function() {
            $http.get(util.baseApiUrl + 'users/1000', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.users = [];
                    }
                    else {
                        $scope.users = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }
        $scope.loadUsers();

        $scope.showUser = function(item) {
            if(item.user && $scope.users.length) {
                var selected = $filter('filter')($scope.users, {_id: item.user});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };


        $scope.relationships = [];
        $scope.getRelationships = function() {
            $http.get(util.baseApiUrl + 'relationships', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.relationships = [];
                    }
                    else {
                        $scope.relationships = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getRelationships();


        $scope.addRelationship = function() {
            $scope.inserted = {
                group: null,
                doctor: null,
                user: null,
                apply: true
            };


            $scope.relationships.push($scope.inserted);
        }

        $scope.removeRelationship = function(id, index) {
            // check if any disease connect to it
            if (!id){
                $scope.relationships.splice(index, 1);
                return;
            }


            $http.delete(util.baseApiUrl + 'relationship/' + id)
                .success(function (response) {
                    $scope.relationshiops.splice(index, 1);
                    toastr.success('成功删除');
                })

                .error(function(err){
                    toastr.error(err.messageFormatted)
                });

        }

        $scope.validate = function(item) {
            if (!item){
                return false;
            }
            if (!item.group){
                toastr.error('group 不能为空!');
                return false;
            }
            if (!item.user){
                toastr.error('user不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveRelationship = function(data, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'relationship', data)
                    .success(function (response) {
                        $scope.inserted = response;

                        $scope.relationships.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.relationships.splice(index + 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'relationship/' + data._id, data)
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

            //$scope.inserted = null;

        }

        $scope.open = function (page, size, item) {
            $rootScope.myUser = item;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'userEditCtrl',
                size: size,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
        };
    }
})();