/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.doctor.group')
        .controller('groupCtrl', groupCtrl);

    /** @ngInject */
    function groupCtrl($scope, $state, $filter, $http, util, toastr, $uibModal) {
        $scope.search = {};

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
            $scope.myPromise = $http.get(util.baseApiUrl + 'groups', {})
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

        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.doctor) {
                // toastr.info($state.params.doctor);

                $scope.search.doctor = $state.params.doctor;
            }
        });

        //==========================================================

        $scope.addGroup = function() {
            $scope.inserted = {
                doctor: $scope.search.doctor || null,
                name: '',
                apply: true
            };


            $scope.groups.push($scope.inserted);
        }

        $scope.removeGroup = function(id) {
            
            $http.delete(util.baseApiUrl + 'group/' + id)
                .success(function (response) {
                    $scope.groups = $filter('filter')($scope.groups, {_id: '!'+id});

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

        $scope.saveGroup = function(data) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'group', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.groups.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.groups.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.groups.splice($scope.groups.length - 1, 1);

                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'group/' + data._id, data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            return toastr.error(util.getErrorMessage(response));
                        };

                        if (!response) {
                            toastr.error('no data');
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    });
            }

            //$scope.inserted = null;

        }


        // goto 组内用户
        $scope.goGroupRelationship = function(group) { // group id
            $state.go('crm.relationship', {group: group._id, doctor: group.doctor});
        }
    }
})();