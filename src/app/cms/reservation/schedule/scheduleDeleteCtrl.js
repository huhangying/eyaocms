/**
 * Created by harry on 16/6/25.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule')
        .controller('scheduleDeleteCtrl', scheduleDeleteCtrl);

    /** @ngInject */
    function scheduleDeleteCtrl($scope, $filter, $http, util, toastr, $q) {
        $scope.schedule = {};

        // 没有这个多选 not working
        $scope.$watch('schedule.periods', function() {
            $('#selectPeriods').selectpicker('refresh');
        });

        // min date picker
        $scope.schedule.startDate = {
            date: new Date(),
            datepickerOptions: {
                minDate: new Date(),
                maxDate: null
            },
            open: false
        };

        // max date picker
        $scope.schedule.endDate = {
            date: new Date(),
            datepickerOptions: {
                minDate: null
            },
            open: false
        };

        // set date for max picker, 10 days in future
        $scope.schedule.endDate.date.setDate($scope.schedule.endDate.date.getDate() + 1);


        $scope.openCalendar = function(e, picker) {
            $scope.schedule[picker].open = true;
        };
        // watch min and max dates to calculate difference
        var unwatchMinMaxValues = $scope.$watch(function() {
            return [$scope.schedule.startDate, $scope.schedule.endDate];
        }, function() {
            // min max dates
            $scope.schedule.startDate.datepickerOptions.maxDate = $scope.schedule.endDate.date;
            $scope.schedule.endDate.datepickerOptions.minDate = $scope.schedule.startDate.date;

            if ($scope.schedule.startDate.date && $scope.schedule.endDate.date) {
                var diff = $scope.schedule.startDate.date.getTime() - $scope.schedule.endDate.date.getTime();
                $scope.schedule.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
            } else {
                $scope.schedule.dayRange = 'n/a';
            }

        }, true);

        // destroy watcher
        $scope.$on('$destroy', function() {
            unwatchMinMaxValues();
        });


        $scope.doctor = null;
        $scope.schedule.days = {
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false
        };



        $http.get(util.baseApiUrl + 'doctor/' + $scope.search.doctor)
            .success(function (response) {
                // check if return null
                if (response.return && response.return == 'null'){
                    $scope.doctor = null;
                }
                else {
                    $scope.doctor = response;
                    //toastr.info(JSON.stringify($scope.doctor));
                }

            });


        $scope.createSchedule = function(date, period){
            var deferred = $q.defer();
            var data = {
                doctor: $scope.doctor._id,
                period: period._id,
                date: date,
                limit: $scope.schedule.limit

            };

            $http.post(util.baseApiUrl + 'schedule', data).then(

                function (response) {

                    // check if return null
                    if (response.data.return && response.data.return == 'null'){
                        toastr.info('门诊经存在');
                        deferred.resolve();
                    }
                    else {
                        toastr.success('创建门诊成功');
                        deferred.resolve(response.data);
                    }

                },
                function(err){
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        $scope.DeleteSchedules = function() {
            var promises = [];
            var schedules;

            // validation first
            if (!$scope.schedule.periods || $scope.schedule.periods.length < 1){
                toastr.error('请选择有效门诊时间片');
                return;
            }
            if ($scope.schedule.dayRange == 'n/a'){
                toastr.error('请选择有效日期范围');
                return;
            }

            // get all available schedule
            $http.get(util.baseApiUrl + 'schedules/' + $scope.search.doctor).then(

                function (response) {

                    // check if return null
                    if (response.data.return && response.data.return == 'null'){
                        toastr.info('没有有效门诊');
                        return;
                    }

                    schedules = response.data.filter(function(schedule) {
                        if (_.findIndex($scope.schedule.periods, function(p){return p._id == schedule.period;}) < 0) {
                            return false;
                        }
                        var scheduleDate = new Date(schedule.date);
                        if (scheduleDate < $scope.schedule.startDate.date || scheduleDate > $scope.schedule.endDate.date) {
                            return false;
                        }
                        return true;
                    });

                    schedules.map(function(schedule) {
                        promises.push($http.delete(util.baseApiUrl + 'schedule/' + schedule._id).then(

                            function (response) {

                                // check if return null
                                if (response.data.return && response.data.return == 'null'){
                                    toastr.info('找不到需要删除的门诊');
                                }
                                else {
                                    toastr.info('删除门诊成功');

                                }
                            },
                            function(err){
                                toastr.info('删除门诊失败');
                            }
                        ));
                    });

                    $q.all(promises).then(
                        function(results) {
                            $scope.$close(results);
                        },
                        function(err) {
                            $scope.dismiss();
                        }
                    );

                },
                function(err){
                    toastr.info('获取有效门诊失败');
                }
            );
        };

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();