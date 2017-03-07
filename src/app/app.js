'use strict';

global.app = angular.module('BlurAdmin', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',
    'ui.bootstrap.datetimepicker',
    'cgBusy',
    'textAngular',
    // 'angular-sanitize',
    // 'textAngular',
    //'lodash',

    // 'BlurAdmin.login',
    'BlurAdmin.theme',
    // 'BlurAdmin.pages',
    'BlurAdmin.cms',

    // directives
    'BlurAdmin.shared',
])
    .config(['$provide', function($provide){
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate',
            function(taRegisterTool, taOptions){
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars and classes specified in taOptions.
                taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
                taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
                taOptions.toolbar = [
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                    ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                    ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
                    ['html', 'insertImage', 'insertLink']
                ];
                taOptions.classes = {
                    focussed: 'focussed',
                    toolbar: 'btn-toolbar',
                    toolbarGroup: 'btn-group',
                    toolbarButton: 'btn btn-default',
                    toolbarButtonActive: 'active',
                    disabled: 'disabled',
                    textEditor: 'form-control',
                    htmlEditor: 'form-control'
                };

                // Create our own insertImage button
                taRegisterTool('customInsertImage', {
                    iconclass: "fa fa-picture-o",
                    action: function() {
                        var textAngular = this;
                        var savedSelection = rangy.saveSelection();
                        var modalInstance = $modal.open({
                            // Put a link to your template here or whatever
                            template: '<label>Enter the url to your image:</label><input type="text" ng-model="img.url"><button ng-click="submit()">OK</button>',
                            size: 'sm',
                            controller: ['$uibmodalInstance', '$scope',
                                function($modalInstance, $scope) {
                                    $scope.img = {
                                        url: ''
                                    };
                                    $scope.submit = function() {
                                        $modalInstance.close($scope.img.url);
                                    };
                                }
                            ]
                        });

                        modalInstance.result.then(function(imgUrl) {
                            rangy.restoreSelection(savedSelection);
                            textAngular.$editor().wrapSelection('insertImage', imgUrl);
                        });
                        return false;
                    },
                });

                // Now add the button to the default toolbar definition
                // Note: It'll be the last button
                taOptions.toolbar[3].push('customInsertImage');

                return taOptions; // whatever you return will be the taOptions
            }]);

    }])
    .value('cgBusyDefaults',{
        message:'正在处理...',
        //backdrop: false,
        templateUrl: './loading.html',
        delay: 300,
        minDuration: 1000,
        wrapperClass: 'loading'
    });

//app.directive('deleteConfirm', )
// app.control('mainCtrl', ['$scope', '$window', 'lodash', function($scope, $window, _){
//     toastr.info(JSON.stringify($window.sessionStorage.user));
// }]);

