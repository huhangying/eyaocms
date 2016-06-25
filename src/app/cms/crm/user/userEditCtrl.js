/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.user')
        .controller('userEditCtrl', userEditCtrl);

    /** @ngInject */
    function userEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.data = $rootScope.myUser;;


        $scope.saveMe = function() {

            //validate

            // update
            $http.patch(util.baseApiUrl + 'user/wechat/' + $scope.data.link_id, $scope.data)
                .success(function (response) {
                    console.log(JSON.stringify(response))
                    if (!response) {
                        toastr.error(error.messageFormatted);
                    }
                    else{
                        toastr.success('成功更新');
                    }
                });




        }

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $rootScope.myUser = null;
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();