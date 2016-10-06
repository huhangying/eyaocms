//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital.medicine')
        .controller('medicineCtrl', medicineCtrl);

    /** @ngInject */
    function medicineCtrl($scope, $state, $filter, $http, util, toastr, $uibModal) {

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
                name: '',
                unit: '',
                usage: '',
                dosage: {
                    frequency: 0,
                    way: ''
                },
                apply: true
            };


            $scope.medicines.push($scope.inserted);
        }

        $scope.removeMedicine = function(id, index) {

            $http.delete(util.baseApiUrl + 'medicine/' + id)
                .success(function (response) {
                    $scope.medicines = $filter('filter')($scope.medicines, {_id: '!'+id});

                    toastr.success('成功删除');
                });
        }

        $scope.validate = function(item) {
            if (!item || !item.name){
                toastr.error('名字不能为空!');
                return false;
            }
            else if (!item.unit) {
                toastr.error('单位不能为空!');
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
                frequency: data.frequency,
                way: data.way
            };

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'medicine', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.medicines.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.medicines.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.medicines.splice($scope.medicines.length - 1, 1);

                        data._id = response._id;
                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
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

        }

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
            });
        };
        
        $scope.updateParent = function(updatedItem) {
            $scope.medicines[$scope.editIndex] = updatedItem;
        }
    }
})();