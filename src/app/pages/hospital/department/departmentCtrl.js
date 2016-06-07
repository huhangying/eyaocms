//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.hospital.department')
    .controller('departmentCtrl', departmentCtrl);

  /** @ngInject */
  function departmentCtrl($scope, $timeout) {


    $scope.departments = 
        [
      {"id": 1, "name":"harry", "desc": "heary", "order": 1, "apply": true},
      {"id": 2, "name":"harry", "desc": "heary"}
    ];
    //
    // $scope.getDepartments = function() {
    //   request(conf.api.baseUrl + 'departments', function(error, response, body) {
    //     if (error) {
    //       alert(error.message);
    //       return;
    //     }
    //     $scope.departments = response;
    //
    //   });
    // }
    //
    // $scope.getDepartments();

    $scope.addDepartment = function() {

    }

    $scope.removeDepartment = function(index) {
      $scope.departments.splice(index, 1);
    }

  }
})();