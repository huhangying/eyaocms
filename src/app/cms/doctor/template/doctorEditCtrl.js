/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.doctor')
        .controller('doctorEditCtrl', doctorEditCtrl);

    /** @ngInject */
    function doctorEditCtrl($scope, $filter, $http, util, toastr, item, $uibModalInstance) {

        toastr.info(item._id);

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $uibModalInstance.close();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();