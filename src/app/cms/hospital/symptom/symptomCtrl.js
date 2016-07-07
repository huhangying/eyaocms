
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.hospital.symptom')
    .controller('symptomCtrl', symptomCtrl);

  /** @ngInject */
  function symptomCtrl($scope, $filter, $http, util, toastr) {

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


    $scope.diseases = [];
    $scope.getDiseases = function() {
      $http.get(util.baseApiUrl + 'diseases', {})
          .success(function (response) {
            // check if return null
            if (response.return && response.return == 'null'){
              $scope.diseases = [];
            }
            else {
              $scope.diseases = response;
            }

          })
          .error(function(error){
            toastr.error(error.messageFormatted);
          });
    }

    $scope.getDiseases();


    $scope.showDepartment = function(item) {
      if(item.department && $scope.departments.length) {
        var selected = $filter('filter')($scope.departments, {_id: item.department});
        return selected.length ? selected[0].name : '未设置';
      } else {
        return '未设置';
      }
    };

    $scope.addDisease = function() {
      $scope.inserted = {
        department: null,
        name: '',
        desc: '',
        order: 0,
        apply: true
      };


      $scope.diseases.push($scope.inserted);
    }

    $scope.removeDisease = function(id) {

      $http.get(util.baseApiUrl + 'diseases/' + id)
          .success(function(response) {
            var diseases = util.getResponse(response);
            if (diseases && diseases.length > 0) {
              toastr.error('不能被删除,请先删除与之关联的疾病类型。');
            }
            else {
              $http.delete(util.baseApiUrl + 'disease/' + id)
                  .success(function (response) {
                      $scope.symptoms = $filter('filter')($scope.symptoms, {_id: '!'+id});

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
      if (!item.department){
        toastr.error('医院科室不能为空!');
        return false;
      }
      return true;
    }

    $scope.saveDisease = function(data, id) {

      //validate
      if (!$scope.validate(data)){
        return;
      }

      if (!data._id) { // create
        $http.post(util.baseApiUrl + 'disease', data)
            .success(function (response) {
                if (util.getErrorMessage(response)) {
                    $scope.diseases.pop();
                    return toastr.error(util.getErrorMessage(response));
                };

              $scope.inserted = response;

              $scope.diseases.push($scope.inserted);
              toastr.success('成功创建');

              // remove
              $scope.diseases.splice($scope.diseases.length - 1, 1);

            });
      }
      else{ // update
        //angular.extend(data, {_id: id});
        $http.patch(util.baseApiUrl + 'disease/' + id, data)
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

      //$scope.inserted = null;

    }

  }
})();