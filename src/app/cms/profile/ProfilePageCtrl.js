/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $http, $window, $filter, $uibModal, toastr, util) {

    $scope.login = $window.sessionStorage.user;
    // $scope.login = JSON.parse($window.sessionStorage.user);
    toastr.info(JSON.stringify($scope.login));

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
    $http.get(util.baseApiUrl + 'doctor/' + $scope.login._id)
        .success(function(response){
          $scope.user = JSON.parse(response);


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

    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

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

    $scope.switches = [true, true, false, true, true, false];
  }

})();
