/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.relationship')
        .controller('relationshipCtrl', relationshipCtrl);

    /** @ngInject */
    function relationshipCtrl($scope, $state, $filter, $http, util, toastr) {
        $scope.search = {};

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


        $scope.doctors = [];
        $scope.loadDoctors = function() {
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
        $scope.loadDoctors();

        $scope.showDoctor = function(item) {
            if(item.doctor && $scope.doctors.length) {
                var selected = $filter('filter')($scope.doctors, {_id: item.doctor});
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

        $scope.getUsersByDoctor = function(doctorId) {
            var usrList = [];
            $scope.relationships.map(function(relationship) {
                if (relationship.doctor === doctorId) {
                    usrList.push(relationship.user);
                }
            });

            usrList = _.uniq(usrList);

            return $scope.users.filter(function(user) {
                return _.indexOf(usrList, user._id) >= 0;
            });
        };

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
            $scope.myPromise = $http.get(util.baseApiUrl + 'relationships', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.relationships = [];
                    }
                    else {
                        $scope.relationships = response;
                        //
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getRelationships();


        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.group && $state.params.doctor) {
                //toastr.info('group: ' + $state.params.group + '\ndoctor: ' + $state.params.doctor);

                $scope.search.group = $state.params.group;
                $scope.search.doctor = $state.params.doctor;
            }
        });


        //==============================================


        $scope.addRelationship = function() {
            $scope.inserted = {
                group: $scope.search.group || null,
                doctor: $scope.search.doctor || null,
                user: null,
                apply: true
            };

            $scope.relationships.push($scope.inserted);
        }

        $scope.removeRelationship = function(id) {

            $http.delete(util.baseApiUrl + 'relationship/' + id)
                .success(function (response) {
                    $scope.relationships = $filter('filter')($scope.relationships, {_id: '!'+id});

                    toastr.success('成功删除');

                    $scope.relationships = angular.copy($scope.relationships);
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

        $scope.saveRelationship = function(data) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'relationship', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.relationships.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        data._id = response._id;
                        var _index = -1;
                        // find the to-be-created item
                        for (var i=0; i<$scope.relationships.length; i++) {
                            if ($scope.relationships[i].doctor === data.doctor && $scope.relationships[i].group === data.group && !$scope.relationships[i]._id) {
                                _index = i;
                                break;
                            }
                        }
                        $scope.relationships[_index]._id = data._id;
                        toastr.success('成功创建');
                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'relationship/' + data._id, data)
                    .success(function (response) {
                        //console.log(JSON.stringify(response))
                        if (!response) {
                            toastr.error('response is null');
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    })
                    .error(function(err){
                        toastr.error(err.messageFormatted)
                    });
            }

            //$scope.inserted = null;

        }

        $scope.goDoctorGroup = function (id) {
            $state.go('doctor.group', {doctor: id});
        };
    }
})();