/**
 * Created by harry on 16/6/12.
 */

(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $window, toastr) {

        // check if access is allowed
        //var user = JSON.parse($window.sessionStorage.user)
        if (!$window.sessionStorage.user) {
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
            return;
        }
        //toastr.success(JSON.stringify($window.sessionStorage.user));

        $scope.logout = function () {
            $window.sessionStorage.clear();
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
        };
    }

})();