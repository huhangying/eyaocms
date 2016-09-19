//var request = require('request');

(function () {
  'use strict';

  angular.module('BlurAdmin.cms.survey.category')
    .controller('surveyCategoryCtrl', surveyCategoryCtrl);

  /** @ngInject */
  function surveyCategoryCtrl($scope, $state, $filter, $http, util, toastr) {


    $scope.cats = [];

    $scope.getCategories = function() {
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
                    $http.delete(util.baseApiUrl + 'cat/' + id)
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
            $http.post(util.baseApiUrl + 'cat', data)
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

                });
        }
        else{ // update
            //angular.extend(data, {_id: id});
            $http.patch(util.baseApiUrl + 'cat/' + id, data)
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

      $scope.getSurveysByCatId = function(id){
          $state.go('survey.survey', {cat: id});
      }
  }
})();