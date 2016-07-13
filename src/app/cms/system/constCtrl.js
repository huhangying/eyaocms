//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.system.const')
        .controller('constCtrl', constCtrl);

    /** @ngInject */
    function constCtrl($scope, $state, $filter, $http, util, toastr) {


        $scope.consts = [];


        $scope.getConsts = function() {
            $scope.myPromise = $http.get(util.baseApiUrl + 'consts', {})
                .success(function (response) {
                    // check if return null
                    if (response.return && response.return == 'null'){
                        $scope.consts = [];
                    }
                    else {
                        $scope.consts = response;
                    }

                })
                .error(function(error){
                    toastr.error(error.messageFormatted);
                });
        }

        $scope.getConsts();

        $scope.addConst = function() {
            $scope.inserted = {
                name: '',
                desc: '',
                type: 0,
                value: ''
            };


            $scope.consts.push($scope.inserted);
        }

        $scope.removeConst = function(id, index) {

            $http.delete(util.baseApiUrl + 'const/' + id)
                .success(function (response) {
                    $scope.consts = $filter('filter')($scope.consts, {_id: '!'+id});

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

        $scope.saveConst = function(data, id, index) {

            //validate
            if (!$scope.validate(data)){
                return;
            }

            if (!data._id) { // create
                $http.post(util.baseApiUrl + 'const', data)
                    .success(function (response) {
                        if (util.getErrorMessage(response)) {
                            $scope.consts.pop();
                            return toastr.error(util.getErrorMessage(response));
                        };

                        $scope.inserted = response;

                        $scope.consts.push($scope.inserted);
                        toastr.success('成功创建');

                        // remove
                        $scope.consts.splice($scope.consts.length - 1, 1);

                    });
            }
            else{ // update
                //angular.extend(data, {_id: id});
                $http.patch(util.baseApiUrl + 'const/' + id, data)
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


    }
})();