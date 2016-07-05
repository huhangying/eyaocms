/**
 * Created by harry on 16/6/25.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule')
        .controller('scheduleCreateCtrl', scheduleCreateCtrl);

    /** @ngInject */
    function scheduleCreateCtrl($scope, $filter, $http, util, toastr) {
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
        $scope.schedule.endDate.date.setDate($scope.schedule.endDate.date.getDate() + 100);


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
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true
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


        $scope.saveMe = function(item) {

            if ($scope.schedule.dayRange == 'n/a'){
                toastr.error('请选择有效日期范围');
                return;
            }

            var dates = [];
            var startDate = new Date($scope.schedule.startDate.date);
            toastr.info(startDate.getDay())
            for(var i=0; i < $scope.schedule.dayRange; i++){

                startDate.setDate(startDate.getDate() + 1);
                var date = startDate;
                switch(startDate.getDay()) {
                    case 1:
                        if ($scope.schedule.days.monday){
                            dates.push(date);
                        }
                        break;
                    case 2:
                        if ($scope.schedule.days.tuesday){
                            dates.push(date);
                        }
                        break;
                }
            }

            toastr.info(JSON.stringify(dates));



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