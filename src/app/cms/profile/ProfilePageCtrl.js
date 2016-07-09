/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, $http, $state, $window, $filter, $uibModal, toastr, util) {

        $scope.login = JSON.parse($window.sessionStorage.user);
        //toastr.info(JSON.stringify($scope.login));

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

        // get user info
        var doctor_id = $scope.login._id;
        if ($state.params && $state.params.doctor){
            doctor_id = $state.params.doctor;
        }

        $scope.myPromise = $http.get(util.baseApiUrl + 'doctor/' + doctor_id)
            .success(function(response){
                $scope.doctor = response;
                $scope.doctor.password = '';
                //toastr.info(JSON.stringify($scope.doctor));

            })
            .error(function(err){
                toastr.error(err.messageFormatted);
                return;
            });



        $scope.picture = $filter('profilePicture')('Nasta');

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();

        };



        $scope.unconnect = function (item) {
            item.href = undefined;
        };

        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/cms/profile/profileModal.html'
            }).result.then(function (link) {
                item.href = link;
            });
        };

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                });
        };


        $scope.update = function() {

            if ($scope.doctor.password.trim().length > 0) {
                if ($scope.doctor.password != $scope.doctor.confirmPassword) {
                    toastr.error('两次输入的密码不一致!');
                    return;
                }
            }
            else {
                $scope.doctor.password = undefined;
            }

            toastr.info(JSON.stringify($scope.doctor));

            $http.patch(util.baseApiUrl + 'doctor/' + $scope.doctor.user_id, $scope.doctor)
                .success(function (response) {
                    //console.log(JSON.stringify(response))
                    if (!response) {
                        toastr.error(error.messageFormatted);
                    }
                    else{
                        toastr.success('成功更新');
                    }
                });
        };

    }

})();
