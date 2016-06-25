/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.user')
        .controller('userEditCtrl', userEditCtrl);

    /** @ngInject */
    function userEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.data = $rootScope.myUser;

        // toastr.info(JSON.stringify($scope.data));


        $scope.saveMe = function(item) {

            //validate

            // update
            $http.patch(util.baseApiUrl + 'user/wechat/' + item.link_id, item)
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
            $rootScope.myUser = null;
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();