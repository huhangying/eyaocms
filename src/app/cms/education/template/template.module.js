
(function () {
  'use strict';

  angular.module('BlurAdmin.cms.education.template', ['textAngular', 'flow'])
    .config(routeConfig)
      .config(['$provide', function($provide){
          // this demonstrates how to register a new tool and add it to the default toolbar
          $provide.decorator('taOptions', ['$delegate', function(taOptions){
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
              return taOptions; // whatever you return will be the taOptions
          }]);

      }])

      .config(['flowFactoryProvider', function (flowFactoryProvider) {
          flowFactoryProvider.defaults = {
              // target: util.baseApiUrl + 'upload',
              target: 'http://127.0.0.1:3000/upload',
              testChunks: false,
              permanentErrors: [500, 501],
              maxChunkRetries: 1,
              chunkRetryInterval: 5000,
              simultaneousUploads: 1
          };
          // flowFactoryProvider.on('catchAll', function (event) {
          //     console.log('catchAll', arguments);
          // });
          // Can be used with different implementations of Flow.js
          //flowFactoryProvider.factory = fustyFlowFactory;
      }]);;

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('education.template', {
          url: '/template/:department/:cat',
          templateUrl: 'app/cms/education/template/template.html',
          controller: 'templateCtrl',
          title: '宣教材料',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
