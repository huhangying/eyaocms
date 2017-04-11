
(function () {
    'use strict';

    angular.module('BlurAdmin.cms.hospital.faq')
        .controller('faqCtrl', faqCtrl);

    /** @ngInject */
    function faqCtrl($scope, $rootScope, $http, toastr, util) {
        var vm = this;

        $scope.selectOk = function() {
        };

        $scope.updateContent = function() {
            if (!$scope.editResult._id && !$scope.editResult.saved) {
                // create
                $scope.myPromise = $http.post(util.baseApiUrl + 'faq', $scope.editResult)
                    .then(function (response) {
                            // check if return null
                            if (response.return && response.return == 'null'){
                                toastr.error('没能获取常问问题数据');
                                return;
                            }
                            $scope.editResult.saved = true;
                            $scope.faqs.push(angular.copy($scope.editResult));

                            toastr.success('增加成功');
                            $scope.editResult = undefined;
                        },
                        function(error){
                            toastr.error(error.messageFormatted);
                        });

            }
            else {
                // update
                $scope.myPromise = $http.patch(util.baseApiUrl + 'faq/' + $scope.editResult._id, $scope.editResult)
                    .then(function (response) {
                            // check if return null
                            if (response.return && response.return == 'null'){
                                toastr.error('没能获取常问问题数据');
                                return;
                            }
                            for (var i=0; i<$scope.faqs.length; i++) {
                                if (!$scope.editResult.saved) {
                                    if ($scope.faqs[i]._id === $scope.editResult._id) {
                                        $scope.faqs[i] = angular.copy($scope.editResult);
                                        break;
                                    }
                                }
                                else {
                                    if ($scope.faqs[i].name === $scope.editResult.name) {
                                        $scope.faqs[i] = angular.copy($scope.editResult);
                                        break;
                                    }
                                }

                            }

                            toastr.success('更新成功');
                            $scope.editResult = undefined;
                        },
                        function(error){
                            toastr.error(error.messageFormatted);
                        });

            }

        };

        $scope.resetEditItem = function() {
            $scope.editResult = undefined;
        };

        $scope.editFaq = function (result) {
            $scope.editResult = angular.copy(result);
        };


        $scope.removeFaq = function(index, id) {
            $scope.myPromise = $http.delete(util.baseApiUrl + 'faq/' + id)
                .then(function (response) {
                        // check if return null
                        if (response.return && response.return == 'null'){
                            toastr.error('没能获取常问问题数据');
                            return;
                        }
                        $scope.faqs.splice(index, 1);
                        toastr.success('删除成功');
                    },
                    function(error){
                        toastr.error(error.messageFormatted);
                    });
        };

        $scope.addFaq = function() {
            $scope.editResult = {
                question: '',
                answer: '',
                order: 0,
                apply: true
            };
        };

        var init = function () {
            $scope.faqs = [];
            $scope.myPromise = $http.get(util.baseApiUrl + 'faqs/edit')
                .then(function (response) {
                        // check if return null
                        if (response.return && response.return == 'null'){
                            toastr.error('没能获取常问问题数据');
                            return;
                        }
                        $scope.faqs = response.data;

                    },
                    function(error){
                        toastr.error(error.messageFormatted);
                    });
        };

        init();

    }
})();