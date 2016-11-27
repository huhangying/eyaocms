//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.group')
    .controller('surveyGroupCtrl', surveyGroupCtrl);

  /** @ngInject */
  function surveyGroupCtrl($scope, $state, $filter, $http, util, toastr) {


    $scope.groups = [];

    $scope.getGroups = function() {
        $scope.myPromise = $http.get(util.baseApiUrl + 'surveygroups', {})
          .success(function (response) {
              // check if return null
              if (response.return && response.return == 'null'){
                  $scope.groups = [];
              }
              else {
                  $scope.groups = response;
              }

          })
          .error(function(error){
              toastr.error(error.messageFormatted);
          });
    }

    $scope.getGroups();

    $scope.addGroup = function() {
        $scope.inserted = {
            name: '',
            desc: '',
            surveys: [],
            apply: true
        };


        $scope.groups.push($scope.inserted);
    }

    $scope.removeGroup = function(id, index) {

        $http.delete(util.baseApiUrl + 'surveygroup/' + id)
            .success(function (response) {
                $scope.groups = $filter('filter')($scope.groups, {_id: '!'+id});

                toastr.success('成功删除');
            });
    }
      
      $scope.validate = function(item) {
          if (!item || !item.name){
              toastr.error('名字不能为空!');
              return false;
          }
          return true;
      }
    
    $scope.saveGroup = function(data, id, index) {

        //validate
        if (!$scope.validate(data)){
            return;
        }

        if (!data._id) { // create
            $http.post(util.baseApiUrl + 'surveygroup', data)
                .success(function (response) {
                    if (util.getErrorMessage(response)) {
                        $scope.groups.pop();
                        return toastr.error(util.getErrorMessage(response));
                    };

                    $scope.inserted = response;

                    $scope.groups.push($scope.inserted);
                    toastr.success('成功创建');

                    // remove
                    $scope.groups.splice($scope.groups.length - 1, 1);

                    data._id = response._id;
                });
        }
        else{ // update
            data.apply = data.apply || false; // fix the xeditable issue
            $http.patch(util.baseApiUrl + 'surveygroup/' + id, data)
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

    }
      
  }
})();