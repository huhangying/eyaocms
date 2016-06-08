//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.hospital.department')
    .controller('departmentCtrl', departmentCtrl);

  /** @ngInject */
  function departmentCtrl($scope, $filter, $http, util) {


    $scope.departments = [];
    //     [
    //   {"id": 1, "name":"harry", "desc": "heary", "order": 1, "apply": true},
    //   {"id": 2, "name":"harry", "desc": "heary"}
    // ];

    $scope.getDepartments = function() {
      $http.get(util.baseApiUrl + 'departments', {})
          .success(function (response) {
            //console.log(JSON.stringify(response.data))
            if (!response) {
              alert(error.message);
              return;
            }
              // check if return null
              if (response.return && response.return == 'null'){
                  $scope.departments = [];
              }
              else {
                  $scope.departments = response;
              }

          });
    }

    $scope.getDepartments();

    $scope.addDepartment = function() {
        $scope.inserted = {
            name: '',
            desc: '',
            order: 0,
            apply: true
        };


        $scope.departments.push($scope.inserted);
    }

    $scope.removeDepartment = function(id, index) {
        
        // check if any disease connect to it
        if (!id){
            $scope.departments.splice(index, 1);
            return;
        }
        $http.get(util.baseApiUrl + 'diseases/' + id)
            .success(function(response) {
                var diseases = util.getResponse(response);
                if (diseases && diseases.length > 0) {

                    alert('connected. could not be deleted!')
                }
                else {
                    $http.delete(util.baseApiUrl + 'department/' + id)
                        .success(function (response) {
                            $scope.departments.splice(index, 1);
                        })

                }
            });

    }
      
      $scope.validate = function(item) {
          if (_.isEmpty(item.name)){
              return false;
          }
          return true;
      }
    
    $scope.saveDepartment = function(data, id) {

        //todo:
        //validate
        if (!$scope.validate(data)){
            return;
        }

        if (!data._id) { // create
            $http.post(util.baseApiUrl + 'department', data)
                .success(function (response) {
                    $scope.inserted = response;

                    // remove
                    $scope.departments.push($scope.inserted);
                });
        }
        else{ // update
            //angular.extend(data, {_id: id});
            $http.patch(util.baseApiUrl + 'department/' + id, data)
                .success(function (response) {
                    //console.log(JSON.stringify(response))
                    if (!response) {
                        alert(error.message);

                    }
                });
        }

        $scope.inserted = null;

    }

  }
})();