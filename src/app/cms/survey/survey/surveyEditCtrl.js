/**
 * Created by harry on 16/6/13.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.survey.survey')
        .controller('surveyEditCtrl', surveyEditCtrl);

    /** @ngInject */
    function surveyEditCtrl($scope, $rootScope, $filter, $http, util, toastr) {
        $scope.data = $rootScope.myUser;

        // toastr.info(JSON.stringify($scope.data));
        $scope.data.birthdate = new Date($scope.data.birthdate);
        $scope.data.birthdate.buttonBar = {
            show: false,
            now: {
                show: true,
                text: 'Now'
            },
            today: {
                show: true,
                text: 'Today'
            },
            clear: {
                show: true,
                text: 'Clear'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Close'
            }
        };
        
        $scope.openCalendar = function(e) {
            e.preventDefault();
            e.stopPropagation();
            $scope.isOpen = true;
        };

        $scope.saveMe = function(item) {

            //validate

            // update
            $http.patch(util.baseApiUrl + 'user/wechat/' + item.link_id, item)
                .success(function (response) {
                    console.log(JSON.stringify(response))
                    if (!response) {
                        toastr.error(error.messageFormatted);
                    }
                    else{
                        toastr.success('成功更新');
                    }
                });


            $scope.closeMe();

        }

        $scope.closeMe = function(){
            //toastr.info(item._id);
            $rootScope.myUser = null;
            $scope.$dismiss();
            // $uibModalInstance.$dismiss('cancel');
        }
    }
})();