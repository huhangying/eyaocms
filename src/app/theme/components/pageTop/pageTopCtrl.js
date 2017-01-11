/**
 * Created by harry on 16/6/12.
 */

(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $window, $parse, toastr, util) {

        // check if access is allowed
        //var user = JSON.parse($window.sessionStorage.user)
        if (!$window.sessionStorage.user) {
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
            return;
        }


        var user = JSON.parse($window.sessionStorage.user);
        //toastr.success(JSON.stringify(user));
        $scope.user_id = user._id;
        $scope.userName = user.name;
        $scope.icon = 'Ninja';
        $scope.role = user.role;
        if (user.role == 1)
            $scope.icon = 'Burglar';
        else if (user.role == 2)
            $scope.icon = 'Alien';

        $scope.logout = function () {
            $window.sessionStorage.clear();
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
        };

        var init = function() {

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