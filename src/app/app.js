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
  'ui.bootstrap.datetimepicker',
    'cgBusy',
    // 'lodash',

    // 'BlurAdmin.login',
  'BlurAdmin.theme',
  // 'BlurAdmin.pages',
  'BlurAdmin.cms',
  ])
    .value('cgBusyDefaults',{
      message:'',
      //backdrop: true,
      templateUrl: './loading.html',
      delay: 300,
      minDuration: 1000,
      wrapperClass: 'loading'
    });

// app.control('mainCtrl', ['$scope', '$window', 'lodash', function($scope, $window, _){
//     toastr.info(JSON.stringify($window.sessionStorage.user));
// }]);

