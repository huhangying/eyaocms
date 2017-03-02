//var request = require('request');

(function () {
    'use strict';

    angular.module('BlurAdmin.cms.wechat.keyword')
        .controller('keywordCtrl', keywordCtrl);

    /** @ngInject */
    function keywordCtrl($scope, $rootScope, util) {


        $scope.detailFrame = util.peerPageUrl + 'keywordReplyForWx/keywordReplyForWxView';


    }
})();