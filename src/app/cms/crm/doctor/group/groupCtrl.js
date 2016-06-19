/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.doctor.group')
        .controller('groupCtrl', groupCtrl);

    /** @ngInject */
    function groupCtrl($scope, $state, $filter, $http, util, toastr, $uibModal) {

        $scope.doctors = [];
        $scope.getDoctors = function() {
            $http.get(util.baseApiUrl + 'doctors/1000', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.doctors = [];
                    }
                    else {
                        $scope.doctors = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getDoctors();

        $scope.showDoctor = function(item) {
            if(item.doctor && $scope.doctors.length) {
                var selected = $filter('filter')($scope.doctors, {_id: item.doctor});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };


        $scope.groups = [];
        $scope.getGroups = function() {
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

        $scope.getGroups();


        $scope.addGroup = function() {
            $scope.inserted = {
                doctor: null,
                name: '',
                apply: true
            };


            $scope.groups.push($scope.inserted);
        }

        $scope.removeGroup = function(id, index) {
            // check if any disease connect to it
            if (!id){
                $scope.groups.splice(index, 1);
                return;
            }


            $http.delete(util.baseApiUrl + 'group/' + id)
                .success(function (response) {
                    $scope.groups.splice(index, 1);
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
            if (!item.doctor){
                toastr.error('doctor 不能为空!');
                return false;
            }
            if (!item.name){
                toastr.error('名字不能为空!');
                return false;
            }

            return true;
        }

        $scope.saveGroup = function(data, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'group', data)
                    .success(function (response) {
                        $scope.inserted = response;

                        $scope.groups.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.groups.splice(index + 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'group/' + data._id, data)
                    .success(function (response) {
                        toastr.info(JSON.stringify(response))
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


        // goto 组内用户
        $scope.goGroupRelationship = function(group_id) { // group id
            $state.go('crm.relationship', {group: group_id});
        }
    }
})();