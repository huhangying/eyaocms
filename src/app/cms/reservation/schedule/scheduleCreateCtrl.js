/**
 * Created by harry on 16/6/25.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.reservation.schedule')
        .controller('scheduleCreateCtrl', scheduleCreateCtrl);

    /** @ngInject */
    function scheduleCreateCtrl($scope, $filter, $http, util, toastr) {
        $scope.doctor = null;

        $http.get(util.baseApiUrl + 'doctor/' + $scope.search.doctor)
            .success(function (response) {
                // check if return null
                if (response.return && response.return == 'null'){
                    $scope.doctor = null;
                }
                else {
                    $scope.doctor = response;
                    toastr.info(JSON.stringify($scope.doctor));
                }

            });

        toastr.error(JSON.stringify($scope.periods));


        $scope.saveMe = function(item) {

            //validate

            // update
            $http.patch(util.baseApiUrl + 'schedule/' + item.link_id, item)
                .success(function (response) {
                    console.log(JSON.stringify(response))
                    if (!response) {
                        toastr.error(error.messageFormatted);
                    }
                    else{
                        toastr.success('成功更新');
                    }
                });


            $scope.closeMe();

        }

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();