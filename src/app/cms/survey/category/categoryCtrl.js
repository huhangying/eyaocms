//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.category')
    .controller('surveyCategoryCtrl', surveyCategoryCtrl);

  /** @ngInject */
  function surveyCategoryCtrl($scope, $state, $filter, $http, $q, util, toastr) {

      $scope.departments = [];
      $scope.loadDepartments = function() {
          $http.get(util.baseApiUrl + 'departments', {})
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
      $scope.loadDepartments();

      $scope.showDepartment= function(item) {
          if(item.department && $scope.departments.length) {
              var selected = $filter('filter')($scope.departments, {_id: item.department});
              return selected.length ? selected[0].name : '未设置';
          } else {
              return '未设置';
          }
      };
      
    $scope.cats = [];

    $scope.getCats = function() {
        $scope.myPromise = $http.get(util.baseApiUrl + 'surveycats', {})
          .success(function (response) {
              // check if return null
              if (response.return && response.return == 'null'){
                  $scope.cats = [];
              }
              else {
                  $scope.cats = response;
              }

          })
          .error(function(error){
              toastr.error(error.messageFormatted);
          });
    }

    $scope.getCats();

    $scope.addCat = function() {
        $scope.inserted = {
            name: '',
            desc: '',
            order: 0,
            apply: true
        };


        $scope.cats.push($scope.inserted);
    }

    $scope.removeCat = function(id, index) {

        $http.get(util.baseApiUrl + 'surveys/' + id)
            .success(function(response) {
                var surveys = util.getResponse(response);
                if (surveys && surveys.length > 0) {
                    toastr.error('不能被删除,请先删除与之关联的问卷调查。');
                }
                else {
                    $http.delete(util.baseApiUrl + 'surveycat/' + id)
                        .success(function (response) {
                            $scope.cats = $filter('filter')($scope.cats, {_id: '!'+id});

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
    
    $scope.saveCat = function(data, id, index) {

        //validate
        if (!$scope.validate(data)){
            return;
        }

        if (!data._id) { // create
            $http.post(util.baseApiUrl + 'surveycat', data)
                .success(function (response) {
                    if (util.getErrorMessage(response)) {
                        $scope.cats.pop();
                        return toastr.error(util.getErrorMessage(response));
                    };

                    $scope.inserted = response;

                    $scope.cats.push($scope.inserted);
                    toastr.success('成功创建');

                    // remove
                    $scope.cats.splice($scope.cats.length - 1, 1);

                    data._id = response._id;
                });
        }
        else{ // update
            //angular.extend(data, {_id: id});
            $http.patchç
        }

        //

    }

      $scope.getSurveysByCatId = function(id){
          $state.go('survey.survey', {cat: id});
      }
      
      // 固定类别模版,用于创建科室的固定类别(跟具体的逻辑相关)
      var fixedCats = [
          {
              name: '门诊预约后',
              desc: '线上门诊预约后发送给病患'
          },
          {
              name: '处方或重组后',
              desc: '药师开处方或医嘱重组后发送给病患'
          }];

      $scope.createDefaultCatsByDepartment = function (departmentId) {
          // check if existed
          $http.get(util.baseApiUrl + 'surveycats/department/' + departmentId)
              .success(function(response) {
                  var surveycats = util.getResponse(response);
                  if (surveycats && surveycats.length > 0) {
                      for (var i=0; i<surveycats.length; i++) {
                          if (surveycats[i] && surveycats[i].fixed) { // found
                              toastr.warning('该科室的固定类别已经创建。');
                              return;
                          }
                      }
                  }

                  // create
                  var promises = [], reqBody;
                  for (var i=0; i<fixedCats.length; i++) {
                      reqBody = {
                          department: departmentId,
                          name: fixedCats[i].name,
                          desc: fixedCats[i].desc,
                          fixed: true
                      };
                      promises.push(
                          $http.post(util.baseApiUrl + 'surveycat', reqBody)
                              .success(function (response) {
                                  $scope.cats.push(response);
                              })
                      );
                  }

                  $q.all(promises).then(function(values) {
                     toastr.success('成功创建固定类别');
                  });


              });
      }
  }
})();