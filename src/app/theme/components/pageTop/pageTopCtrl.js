/**
 * Created by harry on 16/6/12.
 */

(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $rootScope, $window, $parse, toastr, util) {

        $scope.logout = function () {
            $window.sessionStorage.clear();
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
            $rootScope.login = undefined;
        };

        var init = function() {


            // check if access is allowed
            //var user = JSON.parse($window.sessionStorage.user)
            if (!$window.sessionStorage.user) {
                $window.sessionStorage.currentUrl = $window.location.href;
                $window.location.href = '/auth.html';
                return;
            }

            $rootScope.login = JSON.parse(angular.copy($window.sessionStorage.user));
            $scope.icon = 'Ninja';
            $scope.role = $rootScope.login.role;
            if ($scope.role == 1)
                $scope.icon = 'Burglar';
            else if ($scope.role == 2)
                $scope.icon = 'Alien';

            if ($window.sessionStorage.debug === 'undefined') {
                $scope.debug = undefined;
            }
            else {
                $scope.debug = $window.sessionStorage.debug
            }
            if ($scope.debug === 'D0') {
                util.baseApiUrl = 'http://127.0.0.1:3000/';
            }
            else if ($scope.debug === 'D1') {
                util.baseApiUrl = 'http://116.62.29.222:3000/';
            }
            else {
                util.baseApiUrl = 'http://139.224.68.92:3000/';
            }

        };
        init();
    }

})();