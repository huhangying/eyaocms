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


        var user = JSON.parse($window.sessionStorage.user);
        //toastr.success(JSON.stringify(user));
        $scope.user_id = user._id;
        $scope.userName = user.name;
        $scope.icon = 'Ninja';
        if (user.role == 1)
            $scope.icon = 'Burglar';
        else if (user.role == 2)
            $scope.icon = 'Alien';

        $scope.logout = function () {
            $window.sessionStorage.clear();
            $window.sessionStorage.currentUrl = $window.location.href;
            $window.location.href = '/auth.html';
        };
    }

})();