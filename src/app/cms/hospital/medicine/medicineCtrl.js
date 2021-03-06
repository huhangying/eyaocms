//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital.medicine')
        .controller('medicineCtrl', medicineCtrl);

    /** @ngInject */
    function medicineCtrl($scope, $state, $filter, $http, util, toastr, $uibModal) {
        $scope.search = {};

        // $scope.usages = [{text: "内服", value: "0"},
        //     {text: "外用", value: "1"}
        // ];

        $http.get(util.baseApiUrl + 'const/medicine_usages')
            .success(function (response) {
                //console.log(JSON.stringify(response))
                if (!response ){
                    toastr.error('无数据!')
                }
                else if (response.return == 'error') {
                    toastr.error(response.message);
                }
                else{
                    $scope.usages = response.value.split('|');
                }
            });

        $http.get(util.baseApiUrl + 'const/medicine_units')
            .success(function (response) {
                //console.log(JSON.stringify(response))
                if (!response ){
                    toastr.error('无数据!')
                }
                else if (response.return == 'error') {
                    toastr.error(response.message);
                }
                else{
                    $scope.units = response.value.split('|');
                }
            });

        $http.get(util.baseApiUrl + 'const/medicine_periods')
            .success(function (response) {
                //console.log(JSON.stringify(response))
                if (!response ){
                    toastr.error('无数据!')
                }
                else if (response.return == 'error') {
                    toastr.error(response.message);
                }
                else{
                    // 每天:1 ==> name:每天, value: 1
                    $scope.intervalDays = [];
                    response.value.split('|').map(function(item) {
                        $scope.intervalDays.push({
                           name: item.split(':')[0],
                           value: parseInt(item.split(':')[1])
                        });
                    });
                }
            });

        $scope.showInterval = function(intervalDayValue) {
            var selected = [];
            if(intervalDayValue > -1) {
                selected = $filter('filter')($scope.intervalDays, {value: intervalDayValue});
            }
            return selected.length ? selected[0].name : '空';
        };

        $http.get(util.baseApiUrl + 'const/medicine_ways')
            .success(function (response) {
                //console.log(JSON.stringify(response))
                if (!response ){
                    toastr.error('无数据!')
                }
                else if (response.return == 'error') {
                    toastr.error(response.message);
                }
                else{
                    $scope.ways = response.value.split('|');
                }
            });

        // $scope.ways = [
        //     {text: "饭后", value: "1"},
        //     {text: "饭前", value: "2"},
        //     {text: "饭中", value: "3"},
        //     {text: "睡前", value: "4"},
        //     {text: "每4小时", value: "5"},
        //     {text: "每8小时", value: "6"},
        //     {text: "每12小时", value: "7"},
        //     {text: "每天", value: "8"},
        //     {text: "隔天", value: "9"}
        // ];
        // $scope.showDosageWay = function(item) {
        //     var selected = [];
        //     if(item.dosage.way > 0) {
        //         selected = $filter('filter')($scope.ways, {value: item.dosage.way});
        //     }
        //     return selected.length ? selected[0].text : '空';
        // }

        $scope.medicines = [];

        $scope.getMedicines = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'medicines', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.medicines = [];
                    }
                    else {
                        $scope.medicines = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getMedicines();

        $scope.addMedicine = function() {
            $scope.inserted = {
                name: $scope.search.name || '',
                desc: '',
                capacity: 0,
                usage: '',
                dosage: {
                    intervalDay: 0,
                    way: '',
                    frequency: 0,
                    count: 1

                },
                apply: true
            };


            $scope.medicines.push($scope.inserted);
        }

        $scope.removeMedicine = function(id, index) {

            $http.delete(util.baseApiUrl + 'medicine/' + id)
                .success(function (response) {
                    $scope.medicines = $filter('filter')($scope.medicines, {_id: '!'+id});
                    $scope.medicines = angular.copy($scope.medicines);
                    toastr.success('成功删除');
                    $scope.medicines = angular.copy($scope.medicines);
                });
        }

        $scope.validate = function(item) {
            if (!item || !item.name){
                toastr.error('名字不能为空!');
                return false;
            }

            return true;
        }

        $scope.saveMedicine = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            data.dosage = {
                intervalDay: parseInt(data.intervalDay, 10),
                way: data.way,
                frequency: data.frequency,
                count: data.count
            };

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'medicine', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.medicines.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        data = response;
                        var _index = getIndexByData(data);
                        $scope.medicines[_index] = data;
                        toastr.success('成功创建');

                        $scope.medicines = angular.copy($scope.medicines);

                    });
            }
            else{ // update
                data.apply = data.apply || false; // fix the xeditable issue
                $http.patch(util.baseApiUrl + 'medicine/' + id, data)
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

        };

        var getIndexByData = function(data, isUpdate) {
            var _index = -1;
            // find the to-be-created item
            for (var i=0; i<$scope.medicines.length; i++) {
                if (!isUpdate && !$scope.medicines[i]._id) { // create
                    _index = i;
                    break;
                }
                else if (isUpdate && $scope.medicines[i]._id === data._id) { // update
                    _index = i;
                    break;
                }
            }
            return _index;
        };

        $scope.open = function (page, size, item, index) {
            $scope.editItem = item; // pass item into the edit page
            $scope.editIndex = index;
            $uibModal.open({
                animation: true,
                templateUrl: page,
                controller: 'medicineEditCtrl',
                size: size,
                scope: $scope
                // resolve: {
                //     item: function () {
                //         return item;
                //     }
                // }
            }).result.then(
                function(updatedItem) {
                    var index = getIndexByData(updatedItem, true);
                    $scope.medicines[index] = updatedItem;

                    $scope.medicines = angular.copy($scope.medicines);
                    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
                    //$scope.displayedItems = [].concat($scope.medicines);
                },
                function(err) {

                }
            );
        };

    }
})();