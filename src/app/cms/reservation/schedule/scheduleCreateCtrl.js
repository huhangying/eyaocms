/**
 * Created by harry on 16/6/25.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule')
        .controller('scheduleCreateCtrl', scheduleCreateCtrl);

    /** @ngInject */
    function scheduleCreateCtrl($scope, $filter, $http, util, toastr, $q) {
        $scope.schedule = {};

        // 没有这个多选 not working
        $scope.$watch('schedule.periods', function() {
            $('#selectPeriods').selectpicker('refresh');
        });
        $scope.schedule.limit = 20;

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

        $scope.getAvailableDates = function(){
            var dates = [];

            for(var i=0; i < $scope.schedule.dayRange; i++){
                var startDate = new Date($scope.schedule.startDate.date).setHours(12,0,0,0);
                dates.push(new Date(startDate + i*24*60*60*1000));
            }

            return dates.filter(function(date){
                switch(date.getDay()) {
                    case 0:
                        return $scope.schedule.days.sunday;
                    case 1:
                        return $scope.schedule.days.monday;
                    case 2:
                        return $scope.schedule.days.tuesday;
                    case 3:
                        return $scope.schedule.days.wednesday;
                    case 4:
                        return $scope.schedule.days.monday;
                    case 5:
                        return $scope.schedule.days.friday;
                    case 6:
                        return $scope.schedule.days.saturday;
                    default:
                        return false;
                }
            });

        }

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

        $scope.saveMe = function(item) {
            var promises = [];

            // validation first
            if (!$scope.schedule.periods || $scope.schedule.periods.length < 1){
                toastr.error('请选择有效门诊时间片');
                return;
            }
            if ($scope.schedule.dayRange == 'n/a'){
                toastr.error('请选择有效日期范围');
                return;
            }


            var dates = $scope.getAvailableDates();
            //toastr.info(JSON.stringify(dates));
            dates.map(function(date){

                $scope.schedule.periods.map(function(period){
                    // search by
                    promises.push($scope.createSchedule(date, period));
                })
            });


            $q.all(promises).then(
                function(results) {
                    results = results.filter(function(result) {
                        return result;
                    });
                    //console.log(results);
                    $scope.$close(results);
                },
                function(err) {
                    $scope.dismiss();
                }
            );


            //validate

            // update
            // $http.patch(util.baseApiUrl + 'schedule/' + item.link_id, item)
            //     .success(function (response) {
            //         console.log(JSON.stringify(response))
            //         if (!response) {
            //             toastr.error(error.messageFormatted);
            //         }
            //         else{
            //             toastr.success('成功更新');
            //         }
            //     });


            //$scope.closeMe();

        }

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();