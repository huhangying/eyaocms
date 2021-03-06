//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.department')
    .controller('departmentCtrl', departmentCtrl);

  /** @ngInject */
  function departmentCtrl($scope, $state, $filter, $http, util, toastr) {


    $scope.departments = [];
    //     [
    //   {"id": 1, "name":"harry", "desc": "heary", "order": 1, "apply": true},
    //   {"id": 2, "name":"harry", "desc": "heary"}
    // ];

    $scope.getDepartments = function() {
        $scope.myPromise = $http.get(util.baseApiUrl + 'departments', {})
          .success(function (response) {
              // check if return null
              if (response.return && response.return == 'null'){
                  $scope.departments = [];
              }
              else {
                  $scope.departments = response;
              }

          })
          .error(function(error){
              toastr.error(error.messageFormatted);
          });
    }

    $scope.getDepartments();

    $scope.addDepartment = function() {
        $scope.inserted = {
            name: '',
            desc: '',
            order: 0,
            assetFolder: '',
            apply: true
        };


        $scope.departments.push($scope.inserted);
    }

    $scope.removeDepartment = function(id, index) {

        $http.get(util.baseApiUrl + 'diseases/' + id)
            .success(function(response) {
                var diseases = util.getResponse(response);
                if (diseases && diseases.length > 0) {
                    toastr.error('不能被删除,请先删除与之关联的疾病类型。');
                }
                else {
                    $http.delete(util.baseApiUrl + 'department/' + id)
                        .success(function (response) {
                            $scope.departments = $filter('filter')($scope.departments, {_id: '!'+id});

                            toastr.success('成功删除');
                        })

                }
            });

    }
      
      $scope.validate = function(item) {
          if (!item || !item.name){
              toastr.error('名字不能为空!');
              return false;
          }
          return true;
      }
    
    $scope.saveDepartment = function(data, id, index) {

        //validate
        if (!$scope.validate(data)){
            return;
        }

        if (!data._id) { // create
            $http.post(util.baseApiUrl + 'department', data)
                .success(function (response) {
                    if (util.getErrorMessage(response)) {
                        $scope.departments.pop();
                        return toastr.error(util.getErrorMessage(response));
                    };

                    $scope.inserted = response;

                    $scope.departments.push($scope.inserted);
                    toastr.success('成功创建');

                    // remove
                    $scope.departments.splice($scope.departments.length - 1, 1);

                });
        }
        else{ // update
            data.apply = data.apply || false; // fix the xeditable issue
            $http.patch(util.baseApiUrl + 'department/' + id, data)
                .success(function (response) {
                    //console.log(JSON.stringify(response))
                    if (!response) {
                        toastr.error(error.messageFormatted);
                    }
                    else{
                        toastr.success('成功更新');
                    }
                });
        }

        //

    }

      $scope.getDiseasesByDepartmentId = function(id){
          $state.go('hospital.disease', {department: id});
      }
  }
})();