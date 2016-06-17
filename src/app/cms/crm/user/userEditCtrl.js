/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.crm.user')
        .controller('userEditCtrl', userEditCtrl);

    /** @ngInject */
    function userEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {


        $scope.closeMe = function(){
            //toastr.info(item._id);
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();