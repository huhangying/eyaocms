/**
 * Created by harry on 16/6/13.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.booking')
        .controller('bookingCtrl', bookingCtrl);

    /** @ngInject */
    function bookingCtrl($scope, $state, $filter, $http, util, toastr) {

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

        $scope.schedules = [];
        $scope.loadSchedules = function() {
            $http.get(util.baseApiUrl + 'schedules/cms/populated')
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
        $scope.loadSchedules();

        $scope.showSchedule = function(item) {
            if(item.schedule && $scope.schedules.length) {
                var selected = $filter('filter')($scope.schedules, {_id: item.schedule});
                return selected.length ? (selected[0].date + selected[0].period.name) : '未设置';
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


        // data
        $scope.bookings = [];
        $scope.getBookings = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'bookings', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.bookings = [];
                    }
                    else {
                        $scope.bookings = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getBookings();

        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            if ($state.params.schedule) {
                toastr.info($state.params.schedule);

                $scope.search.schedule = $state.params.schedule;
            }
        });

        //===========================================================

        $scope.addBooking = function() {
            //todo:
            // $scope.search.doctor = null; // reset
            // $scope.$apply();

            $scope.inserted = {
                doctor: null,
                schedule: null,
                user: null,
                status: '',
                score: 0,
                created: ''
            };


            $scope.bookings.push($scope.inserted);
        }

        $scope.removeBooking = function(id) {

            $http.delete(util.baseApiUrl + 'booking/' + id)
                .success(function (response) {
                    $scope.bookings = $filter('filter')($scope.bookings, {_id: '!'+id});

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
                toastr.error('药师 不能为空!');
                return false;
            }
            if (!item.schedule){
                toastr.error('预约不能为空!');
                return false;
            }
            if (!item.user){
                toastr.error('用户不能为空!');
                return false;
            }
            if (!item.status){
                toastr.error('状态不能为空!');
                return false;
            }
            return true;
        }

        $scope.saveBooking = function(data) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'booking', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.bookings.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };
                        $scope.inserted = response;

                        $scope.bookings.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.bookings.splice($scope.bookings.length - 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'booking/' + data._id, data)
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


    }
})();