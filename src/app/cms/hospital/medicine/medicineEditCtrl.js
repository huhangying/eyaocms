/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital.medicine')
        .controller('medicineEditCtrl', medicineEditCtrl);

    /** @ngInject */
    function medicineEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.item = angular.copy($scope.editItem);
        $scope.editN = {notices: []};
        $scope.editStatus = 0; // Status: 0:init; 1: create; 2: edit;
        $scope.editNIndex = -1;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveNotice = function(index) {

            //validate
            if ($scope.editNForm.$invalid)
                return;

            switch ($scope.editStatus) {
                case 1: // create
                    $scope.item.notices.push(angular.copy($scope.editN));
                    break;
                case 2: // edit
                    $scope.item.notices[$scope.editNIndex] = angular.copy($scope.editN);
                    break;
                default:
                    break;
            }
            $scope.editStatus = 0;
            $scope.editNIndex = -1;

        }

        $scope.saveMedicine = function() {

            var medicine = angular.copy($scope.item);
            //toastr.info(JSON.stringify(medicine))

            // update
            $http.patch(util.baseApiUrl + 'medicine/' + medicine._id, medicine)
                .success(function (response) {
                    //console.log(JSON.stringify(response))
                    if (!response ){
                        toastr.error('错误')
                    }
                    else if (response.return == 'error') {
                        toastr.error(response.message);
                    }
                    else{
                        toastr.success('成功更新');
                        $scope.editItem = response;
                        $scope.updateParent($scope.editItem);
                        $scope.closeMe();
                    }
                });
        }
        
        $scope.closeMe = function(){
            $scope.$dismiss();
        }
        
        $scope.createNotice = function() {
            $scope.editStatus = 1;
            $scope.editNIndex = -1;

            // set default
            $scope.editN.notice = '';
            $scope.editN.days_to_start = 0;
            $scope.editN.during = 0;
            $scope.editQ.require_confirm = false;
            $scope.editN.apply = true;

        }

        $scope.editNotice = function(notice, index) {
            $scope.editStatus = 2;
            $scope.editNIndex = index;

            // load question to edit area
            $scope.editN = angular.copy(notice);
        }

        $scope.removeNotice = function(index) {
            $scope.item.notices.splice(index, 1);
        }

    }
})();