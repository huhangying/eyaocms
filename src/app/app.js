'use strict';

global.app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
    // 'lodash',

    // 'BlurAdmin.login',
  'BlurAdmin.theme',
  // 'BlurAdmin.pages',
  'BlurAdmin.cms',
  ]);

// app.control('mainCtrl', ['$scope', '$window', 'lodash', function($scope, $window, _){
//     toastr.info(JSON.stringify($window.sessionStorage.user));
// }]);

