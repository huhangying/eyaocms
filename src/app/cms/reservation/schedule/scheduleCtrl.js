/**
 * Created by harry on 16/6/13.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule')
        .controller('scheduleCtrl', scheduleCtrl);

    /** @ngInject */
    function scheduleCtrl($scope, $state, $rootScope, $filter, $http, util, toastr, $uibModal) {
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

        $scope.periods = [];
        $scope.loadPeriods = function() {
            $http.get(util.baseApiUrl + 'periods')
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.periods = [];
                    }
                    else {
                        $scope.periods = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }
        $scope.loadPeriods();

        $scope.showPeriod = function(item) {
            if(item.period && $scope.periods.length) {
                var selected = $filter('filter')($scope.periods, {_id: item.period});
                return selected.length ? selected[0].name : '未设置';
            } else {
                return '未设置';
            }
        };

        // data
        $scope.schedules = [];
        $scope.getSchedules = function() {
            $http.get(util.baseApiUrl + 'schedules', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.schedules = [];
                    }
                    else {
                        $scope.schedules = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getSchedules();

        $scope.opened = {};

        // $scope.open = function($event, elementOpened) {
        //     $event.preventDefault();
        //     $event.stopPropagation();
        //
        //     $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        // };

        //===========================================================

        $scope.addSchedules = function() {
            //todo:
            // $scope.search.doctor = null; // reset
            // $scope.$apply();

            $scope.inserted = {
                doctor: $scope.search.doctor || null,
                period: null,
                date: '',
                limit: 0,
                apply: true
            };


            $scope.schedules.push($scope.inserted);
        }

        $scope.removeSchedule = function(id) {

            $http.get(util.baseApiUrl + 'bookings/schedule/' + id)
                .success(function(response) {

                    //toastr.info(JSON.stringify(response));
                    var item = util.getResponse(response);
                    if (item && item.length > 0) {
                        toastr.error('不能被删除,请先删除与之关联的预约booking。');
                    }
                    else {
                        $http.delete(util.baseApiUrl + 'schedule/' + id)
                            .success(function (response) {
                                $scope.schedules = $filter('filter')($scope.schedules, {_id: '!'+id});

                                toastr.success('成功删除');
                            })

                    }
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
                toastr.error('药师 不能为空!');
                return false;
            }
            if (!item.period){
                toastr.error('名字不能为空!');
                return false;
            }
            if (!item.date){
                toastr.error('日期不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveSchedule = function(data, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'schedule', data)
                    .success(function (response) {
                        $scope.inserted = response;

                        $scope.schedules.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.schedules.splice($scope.schedules.length - 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'schedule/' + data._id, data)
                    .success(function (response) {
                        //console.log(JSON.stringify(response))
                        if (!response) {
                            toastr.error("no data");
                        }
                        else{
                            toastr.success('成功更新');
                        }
                    });
            }

            //$scope.inserted = null;
        }

        $scope.getScheduleDetails = function(id) {
            $state.go('reservation.booking', {schedule: id});
        }

        $scope.open = function (page, size, doctor) {
            if (!doctor) {
                return toastr.warning('请先选择一个药师');
            }

            $scope.selectedDoctorId = doctor; // pass item into the edit page
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'scheduleCreateCtrl',
                scope: $scope,
                size: size,
                // resolve: {
                //     item: function () {
                //         return doctor;
                //     }
                // }
            });
        };
    }
})();