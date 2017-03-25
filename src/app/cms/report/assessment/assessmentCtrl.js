/**
 * Created by harry on 16/6/16.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.report.assessment')
        .controller('assessmentCtrl', assessmentCtrl);

    /** @ngInject */
    function assessmentCtrl($scope, $state, $filter, $http, util, toastr) {
        $scope.search = {};

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

        $scope.assessments = [];
        $scope.getAssessments = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'diagnose-assessments/' + $scope.search.doctor)
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.assessments = [];
                    }
                    else {
                        $scope.assessments = response;
                        //
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }




        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.doctor) {
                //toastr.info('group: ' + $state.params.group + '\ndoctor: ' + $state.params.doctor);

                $scope.search.doctor = $state.params.doctor;
            }
        });

        $scope.getReport = function() {
            $scope.getAssessments();
        };


        //==============================================


        $scope.addRelationship = function() {
            $scope.inserted = {
                group: $scope.search.group || null,
                doctor: $scope.search.doctor || null,
                user: null,
                apply: true
            };

            //toastr.info(JSON.stringify($scope.inserted));

            $scope.relationships.push($scope.inserted);
        }

        $scope.removeRelationship = function(id) {

            $http.delete(util.baseApiUrl + 'relationship/' + id)
                .success(function (response) {
                    $scope.relationships = $filter('filter')($scope.relationships, {_id: '!'+id});

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

                        $scope.inserted = response;

                        $scope.relationships.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.relationships.splice($scope.relationships.length - 1, 1);

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